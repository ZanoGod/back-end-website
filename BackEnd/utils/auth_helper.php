<?php
// utils/auth_helper.php - JWT Authentication helper

require_once __DIR__ . '/jwt.php';
require_once __DIR__ . '/helpers.php';

function verifyAuthToken() {
    $token = getBearerToken();
    
    if (!$token) {
        return false;
    }
    
    $payload = verify_jwt($token);
    
    if (!$payload) {
        return false;
    }
    
    return $payload;
}

// getBearerToken() function is already defined in helpers.php
?>