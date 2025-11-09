<?php
// utils/jwt.php - JWT utility functions for FoodFusion

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

require_once __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../config/config.php';

define('JWT_ISSUER', 'foodfusion');
define('JWT_EXPIRE', 60*60*24); // 1 day

function create_jwt($user_id, $email) {
    $payload = [
        'iss' => JWT_ISSUER,
        'iat' => time(),
        'exp' => time() + JWT_EXPIRE,
        'sub' => $user_id,
        'email' => $email
    ];
    return JWT::encode($payload, JWT_SECRET, 'HS256');
}

function verify_jwt($token, $allow_expired = false) {
    try {
        if ($allow_expired) {
            // Decode without verifying 'exp', then check manually
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            $payload = (array)$decoded;
            if (isset($payload['exp']) && $payload['exp'] < time()) {
                // Still return payload for refresh
                return $payload;
            }
            return $payload;
        } else {
            $decoded = JWT::decode($token, new Key(JWT_SECRET, 'HS256'));
            return (array)$decoded;
        }
    } catch (Exception $e) {
        return false;
    }
}
