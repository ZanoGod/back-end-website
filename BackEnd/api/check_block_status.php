<?php
// api/check_block_status.php - Check real-time block status

header('Content-Type: application/json');

// Include required files
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/rate_limiter.php';

// Set CORS headers
setCorsHeaders();

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

try {
    $clientIP = getClientIP();
    $blockStatus = getRemainingBlockTime($clientIP);
    
    if ($blockStatus['blocked']) {
        sendSuccess([
            'blocked' => true,
            'remaining_seconds' => $blockStatus['remaining_seconds'],
            'blocked_until' => $blockStatus['blocked_until'],
            'message' => 'Account is temporarily locked. Please wait ' . formatTime($blockStatus['remaining_seconds']) . ' before trying again.'
        ]);
    } else {
        sendSuccess([
            'blocked' => false,
            'message' => 'Account is not blocked. You can attempt to login.'
        ]);
    }

} catch (Exception $e) {
    logActivity("Block status check error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred. Please try again later.', 500);
}
?>