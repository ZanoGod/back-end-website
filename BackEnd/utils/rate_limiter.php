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
        // Check if still blocked
        if ($record['blocked_until'] && strtotime($record['blocked_until']) > time()) {
            $remainingTime = strtotime($record['blocked_until']) - time();
            return [
                'blocked' => true,
                'remaining_seconds' => $remainingTime,
                'message' => 'Too many failed login attempts. Please try again in ' . ceil($remainingTime / 60) . ' minutes.'
            ];
        }
        
        // Check if attempts exceed limit (5 attempts)
        if ($record['attempts'] >= 5) {
            // Block for 1 minute
            $blockUntil = date('Y-m-d H:i:s', time() + 60); // 1 minute
            $stmt = $pdo->prepare("UPDATE login_attempts SET blocked_until = ? WHERE ip_address = ?");
            $stmt->execute([$blockUntil, $ip]);
            
            return [
                'blocked' => true,
                'remaining_seconds' => 60,
                'message' => 'Too many failed login attempts. Please try again in 1 minute.'
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