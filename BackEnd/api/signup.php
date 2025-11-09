<?php
// api/signup.php - User registration endpoint

header('Content-Type: application/json');

// Include required files
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/jwt.php';

// Set CORS headers
setCorsHeaders();

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    // Get JSON input
    $input = getJsonInput();
    
    if (!$input) {
        sendError('Invalid JSON data', 400);
    }

    // Validate required fields
    $required = ['firstName', 'lastName', 'email', 'password'];
    foreach ($required as $field) {
        if (!isset($input[$field]) || empty(trim($input[$field]))) {
            sendError(ucfirst($field) . ' is required', 400);
        }
    }

    // Additional password confirmation check
    if (isset($input['confirmPassword'])) {
        if ($input['password'] !== $input['confirmPassword']) {
            sendError('Passwords do not match', 400);
        }
    }

    // Create user instance
    $userModel = new User();
    // Attempt to create user
    $result = $userModel->create([
        'firstName' => $input['firstName'],
        'lastName' => $input['lastName'],
        'email' => $input['email'],
        'password' => $input['password']
    ]);
    // Check if user creation was successful
    if (!$result['success']) {
        sendError($result['message'], 400);
    }
    // Get user data
    $user = $userModel->getById($result['user_id']);
    $jwt = create_jwt($user['id'], $user['email']);
    sendSuccess([
        'token' => $jwt,
        'user' => $user
    ], 'Account created successfully! Welcome to FoodFusion!', 201);

} catch (Exception $e) {
    logActivity("Signup error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred. Please try again later.', 500);
}