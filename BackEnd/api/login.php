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
        $response = [
            'blocked' => true,
            'remaining_seconds' => $rateLimitCheck['remaining_seconds'],
            'blocked_until' => $rateLimitCheck['blocked_until'],
            'message' => $rateLimitCheck['message']
        ];
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => $rateLimitCheck['message'], 'data' => $response]);
        exit;
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
        
        // Check if this failed attempt triggers a block
        $newRateLimitCheck = checkLoginRateLimit($clientIP);
        if ($newRateLimitCheck['blocked']) {
            $response = [
                'blocked' => true,
                'remaining_seconds' => $newRateLimitCheck['remaining_seconds'],
                'blocked_until' => $newRateLimitCheck['blocked_until'],
                'message' => $newRateLimitCheck['message']
            ];
            http_response_code(429);
            echo json_encode(['success' => false, 'error' => $newRateLimitCheck['message'], 'data' => $response]);
            exit;
        }
        
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