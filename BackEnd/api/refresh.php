<?php
// api/refresh.php - JWT refresh token endpoint

header('Content-Type: application/json');
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/jwt.php';

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

$headers = getallheaders();
if (!isset($headers['Authorization'])) {
    sendError('Missing Authorization header', 401);
}
$token = str_replace('Bearer ', '', $headers['Authorization']);
$payload = verify_jwt($token, true); // allow expired for refresh
if (!$payload) {
    sendError('Invalid or expired token', 401);
}

// Optionally, check a refresh token in the body or cookies for extra security
// For now, just issue a new JWT
$new_jwt = create_jwt($payload['sub'], $payload['email']);
sendSuccess([
    'token' => $new_jwt
], 'Token refreshed');
