<?php
// models/User.php - User model

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

class User {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance()->getConnection();
    }

    /**
     * Create a new user
     */
    public function create($data) {
        try {
            // Validate required fields
            $required = ['firstName', 'lastName', 'email', 'password'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    return [
                        'success' => false,
                        'message' => ucfirst($field) . ' is required'
                    ];
                }
            }

            // Sanitize inputs
            $firstName = sanitizeInput($data['firstName']);
            $lastName = sanitizeInput($data['lastName']);
            $email = sanitizeInput(strtolower($data['email']));
            $password = $data['password'];

            // Validate email
            if (!validateEmail($email)) {
                return [
                    'success' => false,
                    'message' => 'Invalid email address'
                ];
            }

            // Check if email already exists
            if ($this->emailExists($email)) {
                return [
                    'success' => false,
                    'message' => 'This email address is already registered'
                ];
            }

            // Validate password strength
            $passwordValidation = validatePassword($password);
            if (!$passwordValidation['valid']) {
                return [
                    'success' => false,
                    'message' => implode('. ', $passwordValidation['errors'])
                ];
            }

            // Hash password
            $passwordHash = hashPassword($password);

            // Insert user
            $stmt = $this->db->prepare("
                INSERT INTO users (first_name, last_name, email, password_hash)
                VALUES (:first_name, :last_name, :email, :password_hash)
            ");

            $stmt->execute([
                'first_name' => $firstName,
                'last_name' => $lastName,
                'email' => $email,
                'password_hash' => $passwordHash
            ]);

            $userId = $this->db->lastInsertId();

            logActivity("New user created: $email (ID: $userId)");

            return [
                'success' => true,
                'message' => 'Account created successfully',
                'user_id' => $userId
            ];

        } catch (PDOException $e) {
            logActivity("User creation error: " . $e->getMessage(), 'ERROR');
            return [
                'success' => false,
                'message' => 'Failed to create account. Please try again later.'
            ];
        }
    }

    /**
     * Authenticate user
     */
    public function authenticate($email, $password) {
        try {
            $email = sanitizeInput(strtolower($email));

            $stmt = $this->db->prepare("
                SELECT id, first_name, last_name, email, password_hash, is_active, email_verified
                FROM users
                WHERE email = :email
            ");

            $stmt->execute(['email' => $email]);
            $user = $stmt->fetch();

            if (!$user) {
                return [
                    'success' => false,
                    'message' => 'Invalid email or password'
                ];
            }

            // Check if account is active
            if (!$user['is_active']) {
                return [
                    'success' => false,
                    'message' => 'Your account has been deactivated. Please contact support.'
                ];
            }

            // Verify password
            if (!verifyPassword($password, $user['password_hash'])) {
                return [
                    'success' => false,
                    'message' => 'Invalid email or password'
                ];
            }

            // Remove password hash from user data
            unset($user['password_hash']);

            logActivity("User logged in: $email (ID: {$user['id']})");

            return [
                'success' => true,
                'message' => 'Login successful',
                'user' => $user
            ];

        } catch (PDOException $e) {
            logActivity("Authentication error: " . $e->getMessage(), 'ERROR');
            return [
                'success' => false,
                'message' => 'Authentication failed. Please try again later.'
            ];
        }
    }

    /**
     * Get user by ID
     */
    public function getById($userId) {
        try {
            $stmt = $this->db->prepare("
                SELECT id, first_name, last_name, email, created_at, last_login, 
                       is_active, email_verified
                FROM users
                WHERE id = :id AND is_active = 1
            ");

            $stmt->execute(['id' => $userId]);
            return $stmt->fetch();

        } catch (PDOException $e) {
            logActivity("Get user error: " . $e->getMessage(), 'ERROR');
            return null;
        }
    }

    /**
     * Get user by email
     */
    public function getByEmail($email) {
        try {
            $email = sanitizeInput(strtolower($email));
            
            $stmt = $this->db->prepare("
                SELECT id, first_name, last_name, email, created_at, last_login,
                       is_active, email_verified
                FROM users
                WHERE email = :email
            ");

            $stmt->execute(['email' => $email]);
            return $stmt->fetch();

        } catch (PDOException $e) {
            logActivity("Get user by email error: " . $e->getMessage(), 'ERROR');
            return null;
        }
    }

    /**
     * Check if email exists
     */
    public function emailExists($email) {
        try {
            $email = sanitizeInput(strtolower($email));
            
            $stmt = $this->db->prepare("
                SELECT COUNT(*) as count 
                FROM users 
                WHERE email = :email
            ");

            $stmt->execute(['email' => $email]);
            $result = $stmt->fetch();

            return $result['count'] > 0;

        } catch (PDOException $e) {
            logActivity("Email check error: " . $e->getMessage(), 'ERROR');
            return false;
        }
    }

    /**
     * Update user profile
     */
    public function updateProfile($userId, $data) {
        try {
            $updates = [];
            $params = ['id' => $userId];

            if (isset($data['firstName'])) {
                $updates[] = "first_name = :first_name";
                $params['first_name'] = sanitizeInput($data['firstName']);
            }

            if (isset($data['lastName'])) {
                $updates[] = "last_name = :last_name";
                $params['last_name'] = sanitizeInput($data['lastName']);
            }

            if (empty($updates)) {
                return [
                    'success' => false,
                    'message' => 'No data to update'
                ];
            }

            $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE id = :id";
            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);

            logActivity("User profile updated: ID $userId");

            return [
                'success' => true,
                'message' => 'Profile updated successfully'
            ];

        } catch (PDOException $e) {
            logActivity("Profile update error: " . $e->getMessage(), 'ERROR');
            return [
                'success' => false,
                'message' => 'Failed to update profile'
            ];
        }
    }

    /**
     * Change password
     */
    public function changePassword($userId, $currentPassword, $newPassword) {
        try {
            // Get current password hash
            $stmt = $this->db->prepare("
                SELECT password_hash 
                FROM users 
                WHERE id = :id
            ");
            $stmt->execute(['id' => $userId]);
            $user = $stmt->fetch();

            if (!$user) {
                return [
                    'success' => false,
                    'message' => 'User not found'
                ];
            }

            // Verify current password
            if (!verifyPassword($currentPassword, $user['password_hash'])) {
                return [
                    'success' => false,
                    'message' => 'Current password is incorrect'
                ];
            }

            // Validate new password
            $passwordValidation = validatePassword($newPassword);
            if (!$passwordValidation['valid']) {
                return [
                    'success' => false,
                    'message' => implode('. ', $passwordValidation['errors'])
                ];
            }

            // Update password
            $newPasswordHash = hashPassword($newPassword);
            $stmt = $this->db->prepare("
                UPDATE users 
                SET password_hash = :password_hash 
                WHERE id = :id
            ");
            $stmt->execute([
                'password_hash' => $newPasswordHash,
                'id' => $userId
            ]);

            logActivity("Password changed: User ID $userId");

            return [
                'success' => true,
                'message' => 'Password changed successfully'
            ];

        } catch (PDOException $e) {
            logActivity("Password change error: " . $e->getMessage(), 'ERROR');
            return [
                'success' => false,
                'message' => 'Failed to change password'
            ];
        }
    }
}
?>