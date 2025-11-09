<?php
// api/dashboard.php - Dashboard stats

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

    // Get counts
    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM recipes WHERE user_id = ?");
    $stmt->execute([$userId]);
    $recipeCount = $stmt->fetch()['count'];

    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM community_posts WHERE user_id = ?");
    $stmt->execute([$userId]);
    $postCount = $stmt->fetch()['count'];

    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM culinary_resources WHERE user_id = ?");
    $stmt->execute([$userId]);
    $culinaryCount = $stmt->fetch()['count'];

    $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM educational_resources WHERE user_id = ?");
    $stmt->execute([$userId]);
    $educationalCount = $stmt->fetch()['count'];

    sendSuccess([
        'stats' => [
            'recipe_count' => (int)$recipeCount,
            'post_count' => (int)$postCount,
            'culinary_count' => (int)$culinaryCount,
            'educational_count' => (int)$educationalCount
        ]
    ], 'Dashboard data retrieved successfully');

} catch (Exception $e) {
    logActivity("Dashboard error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred', 500);
}
?>