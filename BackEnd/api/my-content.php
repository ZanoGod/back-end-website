<?php
// api/my-content.php - Get user's own content

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/jwt_auth.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

try {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Unauthorized access', 401);
    }

    $pdo = getDbConnection();
    $userId = $user['sub'];

    // Get user's recipes
    $stmt = $pdo->prepare("SELECT * FROM recipes WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get user's community posts with likes and comments
    $stmt = $pdo->prepare("
        SELECT cp.*, 
               COUNT(DISTINCT cl.id) as like_count,
               COUNT(DISTINCT cc.id) as comment_count,
               GROUP_CONCAT(DISTINCT CONCAT(ul.first_name, ' ', ul.last_name) SEPARATOR ', ') as liked_by,
               GROUP_CONCAT(DISTINCT CONCAT(uc.first_name, ' ', uc.last_name, ': ', cc.comment) SEPARATOR ' | ') as comments
        FROM community_posts cp
        LEFT JOIN community_likes cl ON cp.id = cl.post_id
        LEFT JOIN users ul ON cl.user_id = ul.id
        LEFT JOIN community_comments cc ON cp.id = cc.post_id
        LEFT JOIN users uc ON cc.user_id = uc.id
        WHERE cp.user_id = ?
        GROUP BY cp.id
        ORDER BY cp.created_at DESC
    ");
    $stmt->execute([$userId]);
    $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get user's culinary resources
    $stmt = $pdo->prepare("SELECT * FROM culinary_resources WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    $culinaryResources = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get user's educational resources
    $stmt = $pdo->prepare("SELECT * FROM educational_resources WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$userId]);
    $educationalResources = $stmt->fetchAll(PDO::FETCH_ASSOC);

    sendSuccess([
        'recipes' => $recipes,
        'posts' => $posts,
        'culinary_resources' => $culinaryResources,
        'educational_resources' => $educationalResources
    ], 'User content retrieved successfully');

} catch (Exception $e) {
    logActivity("My content error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred', 500);
}
?>