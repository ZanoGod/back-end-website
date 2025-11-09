<?php
// api/edit-resource.php - Edit culinary/educational resource

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/jwt_auth.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    sendError('Method not allowed', 405);
}

try {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Unauthorized access', 401);
    }

    $input = getJsonInput();
    if (!$input || !isset($input['resource_id']) || !isset($input['type']) || !isset($input['title'])) {
        sendError('Resource ID, type, and title are required', 400);
    }

    $pdo = getDbConnection();
    $userId = $user['sub'];
    $resourceId = $input['resource_id'];
    $type = $input['type']; // 'culinary' or 'educational'

    $table = $type === 'culinary' ? 'culinary_resources' : 'educational_resources';

    // Check ownership
    $stmt = $pdo->prepare("SELECT user_id FROM $table WHERE id = ?");
    $stmt->execute([$resourceId]);
    $resource = $stmt->fetch();

    if (!$resource || $resource['user_id'] != $userId) {
        sendError('Resource not found or access denied', 403);
    }

    // Update resource
    $stmt = $pdo->prepare("UPDATE $table SET title = ?, description = ?, link = ?, updated_at = NOW() WHERE id = ? AND user_id = ?");
    $stmt->execute([
        $input['title'],
        $input['description'] ?? '',
        $input['link'] ?? '',
        $resourceId,
        $userId
    ]);

    sendSuccess(null, 'Resource updated successfully');

} catch (Exception $e) {
    logActivity("Edit resource error: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), 500);
}
?>