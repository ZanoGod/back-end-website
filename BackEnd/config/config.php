<?php
// config/config.php - Configuration file for FoodFusion

// Error reporting (set to 0 in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'foodfusion');
define('DB_USER', 'root');
define('DB_PASS', ''); // Change this in production
define('DB_CHARSET', 'utf8mb4');

// Application settings
define('APP_NAME', 'FoodFusion');
define('APP_URL', 'http://localhost:3000');
define('API_URL', 'http://localhost:8000/api'); // Adjust based on your setup

// Security settings
define('JWT_SECRET', 'your-secret-key-change-this-in-production'); // CHANGE THIS!
define('SESSION_LIFETIME', 7 * 24 * 60 * 60); // 7 days in seconds
define('PASSWORD_MIN_LENGTH', 8);

// CORS settings
define('CORS_ALLOWED_ORIGINS', [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
]);

// Email settings (for future password reset functionality)
define('MAIL_HOST', 'smtp.gmail.com');
define('MAIL_PORT', 587);
define('MAIL_USERNAME', 'your-email@gmail.com');
define('MAIL_PASSWORD', 'your-email-password');
define('MAIL_FROM', 'noreply@foodfusion.com');
define('MAIL_FROM_NAME', 'FoodFusion');

// File upload settings
define('UPLOAD_MAX_SIZE', 5 * 1024 * 1024); // 5MB
define('UPLOAD_ALLOWED_TYPES', ['image/jpeg', 'image/png', 'image/gif', 'image/webp']);
define('UPLOAD_DIR', __DIR__ . '/../uploads/');

// Timezone
date_default_timezone_set('UTC');

// Session settings
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 0); // Set to 1 if using HTTPS
ini_set('session.use_strict_mode', 1);
ini_set('session.cookie_samesite', 'Lax');
?>