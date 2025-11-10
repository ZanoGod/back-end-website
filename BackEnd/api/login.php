<?php
// api/login.php - User login endpoint

header('Content-Type: application/json');

// Include required files
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/rate_limiter.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/jwt.php';

// Set CORS headers
setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Check rate limiting
    $clientIP = getClientIP();
    $rateLimitCheck = checkLoginRateLimit($clientIP);
    
    if ($rateLimitCheck['blocked']) {
        sendError($rateLimitCheck['message'], 429);
    }
    
    // Get JSON input
    $input = getJsonInput();
    
    if (!$input) {
        sendError('Invalid JSON data', 400);
    }

    // Validate required fields
    if (!isset($input['email']) || empty(trim($input['email']))) {
        sendError('Email is required', 400);
    }

    if (!isset($input['password']) || empty(trim($input['password']))) {
        sendError('Password is required', 400);
    }

    $email = trim($input['email']);
    $password = $input['password'];

    // Create user instance
    $userModel = new User();
    // Attempt to authenticate user
    $result = $userModel->authenticate($email, $password);
    
    // Check if authentication was successful
    if (!$result['success']) {
        // Record failed attempt
        recordFailedLogin($clientIP);
        sendError($result['message'], 401);
    }
    
    // Clear login attempts on successful login
    clearLoginAttempts($clientIP);
    
    $user = $result['user'];
    $jwt = create_jwt($user['id'], $user['email']);
    sendSuccess([
        'token' => $jwt,
        'user' => $user
    ], 'Login successful! Welcome back to FoodFusion!', 200);

} catch (Exception $e) {
    logActivity("Login error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred. Please try again later.', 500);
}
?>