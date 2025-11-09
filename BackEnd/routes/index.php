<?php
// index.php - API entry point and router

header('Content-Type: application/json');

// Include required files
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/utils/helpers.php';

// Set CORS headers
setCorsHeaders();

// Get the request URI
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$requestUri = strtok($requestUri, '?');

// Remove base path if exists
$basePath = '/foodfusion-backend'; // Adjust this based on your setup
$requestUri = str_replace($basePath, '', $requestUri);

// API info endpoint
if ($requestUri === '/' || $requestUri === '/index.php') {
    sendSuccess([
        'name' => APP_NAME,
        'version' => '1.0.0',
        'message' => 'Welcome to FoodFusion API',
        'endpoints' => [
            'POST /api/signup' => 'Register new user',
            'POST /api/login' => 'User login',
            'POST /api/logout' => 'User logout (requires auth)',
            'GET /api/profile' => 'Get user profile (requires auth)',
            'PUT /api/profile' => 'Update user profile (requires auth)',
            'GET /api/recipes' => 'List all recipes',
            'POST /api/recipes' => 'Create recipe (requires auth)',
            'GET /api/community' => 'List community posts',
            'POST /api/community' => 'Create post (requires auth)',
        ],
        'documentation' => APP_URL . '/docs',
        'status' => 'online'
    ], 'API is running');
}

// Health check endpoint
if ($requestUri === '/health') {
    try {
        // Check database connection
        require_once __DIR__ . '/config/database.php';
        $db = Database::getInstance()->getConnection();
        
        sendSuccess([
            'status' => 'healthy',
            'database' => 'connected',
            'timestamp' => date('Y-m-d H:i:s')
        ], 'System is healthy');
    } catch (Exception $e) {
        sendError('Database connection failed', 503, [
            'status' => 'unhealthy',
            'error' => 'Database unavailable'
        ]);
    }
}

// 404 - Endpoint not found
sendError('Endpoint not found', 404, [
    'requested_uri' => $requestUri,
    'requested_method' => $requestMethod
]);
?>