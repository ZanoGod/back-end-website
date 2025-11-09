<?php
// api/educational-resources.php - Educational resources CRUD operations

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/auth_helper.php';

setCorsHeaders();

try {
    $pdo = getDbConnection();
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Create educational resource - requires authentication
        $user = verifyAuthToken();
        if (!$user) {
            sendError('Unauthorized access', 401);
        }

        $input = getJsonInput();
        if (!$input) {
            sendError('Invalid JSON data', 400);
        }

        $required = ['title', 'link'];
        foreach ($required as $field) {
            if (!isset($input[$field]) || empty(trim($input[$field]))) {
                sendError(ucfirst($field) . ' is required', 400);
            }
        }

        $stmt = $pdo->prepare("
            INSERT INTO educational_resources (user_id, title, description, link) 
            VALUES (?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $user['sub'],
            $input['title'],
            $input['description'] ?? null,
            $input['link']
        ]);

        sendSuccess(['resource_id' => $pdo->lastInsertId()], 'Educational resource created successfully', 201);
        
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Get educational resources - public access
        $stmt = $pdo->prepare("
            SELECT er.*, u.first_name, u.last_name 
            FROM educational_resources er 
            LEFT JOIN users u ON er.user_id = u.id 
            ORDER BY er.is_system_resource DESC, er.created_at DESC 
            LIMIT 50
        ");
        $stmt->execute();
        $resources = $stmt->fetchAll(PDO::FETCH_ASSOC);

        sendSuccess(['resources' => $resources], 'Educational resources retrieved successfully');
    } else {
        sendError('Method not allowed', 405);
    }

} catch (Exception $e) {
    logActivity("Educational resources error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred', 500);
}
?>