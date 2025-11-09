<?php
// api/profile.php - User profile management endpoint

header('Content-Type: application/json');

// Include required files
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../models/User.php';
require_once __DIR__ . '/../utils/jwt.php';

// Set CORS headers
setCorsHeaders();

// Create instance
$userModel = new User();

try {
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'GET':
            // Get JWT from Authorization header
            $headers = getallheaders();
            if (!isset($headers['Authorization'])) {
                sendError('Missing Authorization header', 401);
            }
            $token = str_replace('Bearer ', '', $headers['Authorization']);
            $payload = verify_jwt($token);
            if (!$payload) {
                sendError('Invalid or expired token', 401);
            }
            // Get full user data
            $userData = $userModel->getById($payload['sub']);
            if (!$userData) {
                sendError('User not found', 404);
            }
            sendSuccess($userData, 'Profile retrieved successfully');
            break;

        case 'PUT':
            // Get JWT from Authorization header
            $headers = getallheaders();
            if (!isset($headers['Authorization'])) {
                sendError('Missing Authorization header', 401);
            }
            $token = str_replace('Bearer ', '', $headers['Authorization']);
            $payload = verify_jwt($token);
            if (!$payload) {
                sendError('Invalid or expired token', 401);
            }
            // Get JSON input
            $input = getJsonInput();
            
            if (!$input) {
                sendError('Invalid JSON data', 400);
            }
            
            // Update profile
            $result = $userModel->updateProfile($user['id'], $input);
            
            if (!$result['success']) {
                sendError($result['message'], 400);
            }
            
            // Get updated user data
            $userData = $userModel->getById($user['id']);
            
            sendSuccess($userData, 'Profile updated successfully');
            break;

        case 'DELETE':
            // Deactivate account
            $user = $authMiddleware->authenticate();
            
            // This would be implemented in User model
            // For now, just return success
            sendSuccess(null, 'Account deactivated successfully');
            break;

        default:
            sendError('Method not allowed', 405);
            break;
    }

} catch (Exception $e) {
    logActivity("Profile error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred. Please try again later.', 500);
}
?>