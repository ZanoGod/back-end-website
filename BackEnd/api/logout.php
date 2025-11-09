<?php
// api/logout.php - User logout endpoint

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../utils/helpers.php';
// Set CORS headers
setCorsHeaders();
// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}
// With JWT, logout is stateless. The client should delete the JWT token.
sendSuccess(null, 'Logged out (client should delete JWT from storage)', 200);