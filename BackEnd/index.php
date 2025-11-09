<?php
// index.php - API entry point and router with database connection test

header('Content-Type: application/json');

// Include required files
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/utils/helpers.php';

// Set CORS headers
setCorsHeaders();

// Test database connection on startup
try {
    $db = Database::getInstance()->getConnection();
    $dbConnected = true;
    $dbError = null;
} catch (Exception $e) {
    $dbConnected = false;
    $dbError = $e->getMessage();
    logActivity("Database connection failed: " . $dbError, 'ERROR');
}

// Get the request URI
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$requestUri = strtok($requestUri, '?');

// Remove base path if exists (adjust based on your setup)
$basePath = '/foodfusion-backend'; // Change to '' if in root
$requestUri = str_replace($basePath, '', $requestUri);

// Clean URI
$requestUri = rtrim($requestUri, '/');
if (empty($requestUri)) {
    $requestUri = '/';
}

// API info endpoint
if ($requestUri === '/' || $requestUri === '/index.php') {
    $response = [
        'name' => APP_NAME,
        'version' => '1.0.0',
        'message' => 'Welcome to FoodFusion API',
        'status' => $dbConnected ? 'online' : 'database error',
        'database' => [
            'connected' => $dbConnected,
            'host' => DB_HOST,
            'database' => DB_NAME
        ],
        'endpoints' => [
            'GET /' => 'API information',
            'GET /health' => 'Health check',
            'GET /test-db' => 'Test database connection',
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
        'server_info' => [
            'php_version' => PHP_VERSION,
            'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
            'current_time' => date('Y-m-d H:i:s')
        ]
    ];
    
    if (!$dbConnected) {
        $response['database']['error'] = $dbError;
    }
    
    sendSuccess($response, $dbConnected ? 'API is running' : 'API running but database error');
}

// Health check endpoint
if ($requestUri === '/health') {
    try {
        // Test database connection
        $db = Database::getInstance()->getConnection();
        
        // Test query
        $stmt = $db->query("SELECT 1 as test");
        $result = $stmt->fetch();
        
        sendSuccess([
            'status' => 'healthy',
            'database' => [
                'connected' => true,
                'responding' => true,
                'host' => DB_HOST,
                'database' => DB_NAME
            ],
            'timestamp' => date('Y-m-d H:i:s'),
            'uptime' => 'running'
        ], 'System is healthy');
        
    } catch (Exception $e) {
        sendError('System unhealthy', 503, [
            'status' => 'unhealthy',
            'database' => [
                'connected' => false,
                'error' => $e->getMessage()
            ],
            'timestamp' => date('Y-m-d H:i:s')
        ]);
    }
}

// Database connection test endpoint
if ($requestUri === '/test-db') {
    try {
        $db = Database::getInstance()->getConnection();
        
        // Get database stats
        $stmt = $db->query("SELECT VERSION() as version");
        $version = $stmt->fetch();
        
        // Check tables
        $stmt = $db->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        // Get user count
        $userCount = 0;
        if (in_array('users', $tables)) {
            $stmt = $db->query("SELECT COUNT(*) as count FROM users");
            $result = $stmt->fetch();
            $userCount = $result['count'];
        }
        
        sendSuccess([
            'connection' => [
                'status' => 'connected',
                'host' => DB_HOST,
                'database' => DB_NAME,
                'charset' => DB_CHARSET
            ],
            'mysql' => [
                'version' => $version['version']
            ],
            'tables' => [
                'total' => count($tables),
                'list' => $tables
            ],
            'statistics' => [
                'total_users' => $userCount
            ],
            'timestamp' => date('Y-m-d H:i:s')
        ], 'Database connection successful');
        
    } catch (Exception $e) {
        sendError('Database connection failed', 500, [
            'error' => $e->getMessage(),
            'config' => [
                'host' => DB_HOST,
                'database' => DB_NAME,
                'user' => DB_USER
            ],
            'tips' => [
                '1. Check if MySQL service is running',
                '2. Verify database credentials in config/config.php',
                '3. Ensure database exists: CREATE DATABASE ' . DB_NAME,
                '4. Check user permissions: GRANT ALL ON ' . DB_NAME . '.* TO \'' . DB_USER . '\'@\'localhost\''
            ]
        ]);
    }
}

// 404 - Endpoint not found
sendError('Endpoint not found', 404, [
    'requested_uri' => $requestUri,
    'requested_method' => $requestMethod,
    'available_endpoints' => [
        'GET /',
        'GET /health',
        'GET /test-db',
        'POST /api/signup.php',
        'POST /api/login.php',
        'POST /api/logout.php',
        'GET /api/profile.php',
        'PUT /api/profile.php'
    ]
]);
?>