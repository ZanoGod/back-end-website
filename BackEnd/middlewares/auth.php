<?php
// middleware/auth.php - Authentication middleware

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

class AuthMiddleware {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Verify session token and return user data
     */
    public function authenticate() {
        $token = $this->getTokenFromRequest();
        
        if (!$token) {
            sendError('Authentication required', 401);
        }

        $user = $this->validateToken($token);
        
        if (!$user) {
            sendError('Invalid or expired session', 401);
        }

        return $user;
    }

    /**
     * Get token from request
     */
    private function getTokenFromRequest() {
        // Try to get from Authorization header
        $token = getBearerToken();
        
        // If not in header, try to get from cookie
        if (!$token && isset($_COOKIE['session_token'])) {
            $token = $_COOKIE['session_token'];
        }
        
        return $token;
    }

    /**
     * Validate session token
     */
    private function validateToken($token) {
        try {
            $stmt = $this->db->prepare("
                SELECT 
                    u.id,
                    u.first_name,
                    u.last_name,
                    u.email,
                    u.is_active,
                    u.email_verified,
                    s.expires_at
                FROM user_sessions s
                INNER JOIN users u ON s.user_id = u.id
                WHERE s.session_token = :token
                AND s.expires_at > NOW()
                AND u.is_active = 1
            ");
            
            $stmt->execute(['token' => $token]);
            $result = $stmt->fetch();
            
            if ($result) {
                // Update last activity
                $this->updateSessionActivity($token);
                return $result;
            }
            
            return null;
        } catch (PDOException $e) {
            logActivity("Token validation error: " . $e->getMessage(), 'ERROR');
            return null;
        }
    }

    /**
     * Update session activity timestamp
     */
    private function updateSessionActivity($token) {
        try {
            // Extend session expiry
            $newExpiry = date('Y-m-d H:i:s', time() + SESSION_LIFETIME);
            
            $stmt = $this->db->prepare("
                UPDATE user_sessions 
                SET expires_at = :expires_at 
                WHERE session_token = :token
            ");
            
            $stmt->execute([
                'expires_at' => $newExpiry,
                'token' => $token
            ]);
        } catch (PDOException $e) {
            logActivity("Session update error: " . $e->getMessage(), 'ERROR');
        }
    }

    /**
     * Optional authentication - returns user if authenticated, null otherwise
     */
    public function optionalAuth() {
        $token = $this->getTokenFromRequest();
        
        if (!$token) {
            return null;
        }

        return $this->validateToken($token);
    }

    /**
     * Create new session
     */
    public function createSession($userId) {
        try {
            $token = generateSecureToken(64);
            $expiresAt = date('Y-m-d H:i:s', time() + SESSION_LIFETIME);
            $ipAddress = $_SERVER['REMOTE_ADDR'] ?? null;
            $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;

            $stmt = $this->db->prepare("
                INSERT INTO user_sessions 
                (user_id, session_token, ip_address, user_agent, expires_at)
                VALUES (:user_id, :token, :ip, :user_agent, :expires_at)
            ");
            
            $stmt->execute([
                'user_id' => $userId,
                'token' => $token,
                'ip' => $ipAddress,
                'user_agent' => $userAgent,
                'expires_at' => $expiresAt
            ]);

            // Update last login
            $stmt = $this->db->prepare("
                UPDATE users 
                SET last_login = NOW() 
                WHERE id = :user_id
            ");
            $stmt->execute(['user_id' => $userId]);

            return [
                'token' => $token,
                'expires_at' => $expiresAt
            ];
        } catch (PDOException $e) {
            logActivity("Session creation error: " . $e->getMessage(), 'ERROR');
            return null;
        }
    }

    /**
     * Destroy session
     */
    public function destroySession($token) {
        try {
            $stmt = $this->db->prepare("
                DELETE FROM user_sessions 
                WHERE session_token = :token
            ");
            
            return $stmt->execute(['token' => $token]);
        } catch (PDOException $e) {
            logActivity("Session destruction error: " . $e->getMessage(), 'ERROR');
            return false;
        }
    }

    /**
     * Clean up expired sessions
     */
    public function cleanExpiredSessions() {
        try {
            $stmt = $this->db->prepare("
                DELETE FROM user_sessions 
                WHERE expires_at < NOW()
            ");
            
            return $stmt->execute();
        } catch (PDOException $e) {
            logActivity("Session cleanup error: " . $e->getMessage(), 'ERROR');
            return false;
        }
    }
}
?>