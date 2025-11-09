<?php
// utils/rate_limiter.php - Rate limiting functionality

/**
 * Check if IP is rate limited for login attempts
 */
function checkLoginRateLimit($ip) {
    $pdo = getDbConnection();
    
    // Create login_attempts table if not exists
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS login_attempts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ip_address VARCHAR(45) NOT NULL,
            attempts INT DEFAULT 1,
            last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            blocked_until TIMESTAMP NULL,
            INDEX idx_ip (ip_address)
        )
    ");
    
    // Check current attempts for this IP
    $stmt = $pdo->prepare("SELECT attempts, blocked_until FROM login_attempts WHERE ip_address = ?");
    $stmt->execute([$ip]);
    $record = $stmt->fetch();
    
    if ($record) {
        // Check if block period has expired
        if ($record['blocked_until'] && strtotime($record['blocked_until']) <= time()) {
            // Block period expired, reset attempts
            $stmt = $pdo->prepare("UPDATE login_attempts SET attempts = 0, blocked_until = NULL WHERE ip_address = ?");
            $stmt->execute([$ip]);
            return ['blocked' => false];
        }
        
        // Check if still blocked
        if ($record['blocked_until'] && strtotime($record['blocked_until']) > time()) {
            $remainingTime = strtotime($record['blocked_until']) - time();
            return [
                'blocked' => true,
                'remaining_seconds' => $remainingTime,
                'blocked_until' => $record['blocked_until'],
                'message' => 'Account temporarily locked due to multiple failed login attempts. Please try again in ' . formatTime($remainingTime) . '.'
            ];
        }
        
        // Check if attempts exceed limit (3 attempts for faster blocking)
        if ($record['attempts'] >= 3) {
            // Block for exactly 1 minute
            $blockDuration = 60; // 1 minute
            $blockUntil = date('Y-m-d H:i:s', time() + $blockDuration);
            $stmt = $pdo->prepare("UPDATE login_attempts SET blocked_until = ? WHERE ip_address = ?");
            $stmt->execute([$blockUntil, $ip]);
            
            return [
                'blocked' => true,
                'remaining_seconds' => $blockDuration,
                'blocked_until' => $blockUntil,
                'message' => 'Account temporarily locked due to multiple failed login attempts. Please try again in 1 minute.'
            ];
        }
    }
    
    return ['blocked' => false];
}

/**
 * Record failed login attempt
 */
function recordFailedLogin($ip) {
    $pdo = getDbConnection();
    
    $stmt = $pdo->prepare("SELECT attempts FROM login_attempts WHERE ip_address = ?");
    $stmt->execute([$ip]);
    $record = $stmt->fetch();
    
    if ($record) {
        // Increment attempts
        $stmt = $pdo->prepare("UPDATE login_attempts SET attempts = attempts + 1, last_attempt = NOW() WHERE ip_address = ?");
        $stmt->execute([$ip]);
    } else {
        // Create new record
        $stmt = $pdo->prepare("INSERT INTO login_attempts (ip_address, attempts) VALUES (?, 1)");
        $stmt->execute([$ip]);
    }
}

/**
 * Clear login attempts on successful login
 */
function clearLoginAttempts($ip) {
    $pdo = getDbConnection();
    $stmt = $pdo->prepare("DELETE FROM login_attempts WHERE ip_address = ?");
    $stmt->execute([$ip]);
}

/**
 * Get remaining block time for an IP
 */
function getRemainingBlockTime($ip) {
    $pdo = getDbConnection();
    $stmt = $pdo->prepare("SELECT blocked_until FROM login_attempts WHERE ip_address = ? AND blocked_until IS NOT NULL");
    $stmt->execute([$ip]);
    $record = $stmt->fetch();
    
    if ($record && strtotime($record['blocked_until']) > time()) {
        return [
            'blocked' => true,
            'remaining_seconds' => strtotime($record['blocked_until']) - time(),
            'blocked_until' => $record['blocked_until']
        ];
    }
    
    return ['blocked' => false];
}

/**
 * Format time duration for user display
 */
function formatTime($seconds) {
    if ($seconds < 60) {
        return $seconds . ' seconds';
    } elseif ($seconds < 3600) {
        $minutes = ceil($seconds / 60);
        return $minutes . ' minute' . ($minutes > 1 ? 's' : '');
    } else {
        $hours = ceil($seconds / 3600);
        return $hours . ' hour' . ($hours > 1 ? 's' : '');
    }
}

/**
 * Get client IP address
 */
function getClientIP() {
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}
?>