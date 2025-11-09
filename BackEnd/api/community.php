<?php
// api/community.php - Community posts operations

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/jwt_auth.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get community posts
    try {
        $pdo = getDbConnection();
        
        // Check if user is authenticated
        $user = verifyAuthToken();
        
        if ($user) {
            // Logged in: show all user posts
            $stmt = $pdo->prepare("
                SELECT cp.*, u.first_name, u.last_name, u.email,
                       COUNT(DISTINCT cl.id) as like_count,
                       COUNT(DISTINCT cc.id) as comment_count
                FROM community_posts cp
                JOIN users u ON cp.user_id = u.id
                LEFT JOIN community_likes cl ON cp.id = cl.post_id
                LEFT JOIN community_comments cc ON cp.id = cc.post_id
                GROUP BY cp.id
                ORDER BY cp.created_at DESC
            ");
        } else {
            // Not logged in: show only system posts
            $stmt = $pdo->prepare("
                SELECT cp.*, u.first_name, u.last_name, u.email,
                       COUNT(DISTINCT cl.id) as like_count,
                       COUNT(DISTINCT cc.id) as comment_count
                FROM community_posts cp
                JOIN users u ON cp.user_id = u.id
                LEFT JOIN community_likes cl ON cp.id = cl.post_id
                LEFT JOIN community_comments cc ON cp.id = cc.post_id
                WHERE u.email = 'system@foodfusion.com'
                GROUP BY cp.id
                ORDER BY cp.created_at DESC
                LIMIT 10
            ");
        }
        
        $stmt->execute();
        $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        sendSuccess($posts, 'Community posts retrieved successfully');
        
    } catch (Exception $e) {
        logActivity("Community fetch error: " . $e->getMessage(), 'ERROR');
        sendError('An unexpected error occurred', 500);
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Unauthorized access', 401);
    }

    $input = getJsonInput();
    if (!$input || !isset($input['title'])) {
        sendError('Title is required', 400);
    }

    try {
        $pdo = getDbConnection();
        $stmt = $pdo->prepare("INSERT INTO community_posts (user_id, title, photo_url, caption) VALUES (?, ?, ?, ?)");
        $stmt->execute([
            $user['sub'],
            $input['title'],
            $input['photo_url'] ?? null,
            $input['caption'] ?? null
        ]);
        sendSuccess(['post_id' => $pdo->lastInsertId()], 'Community post created successfully', 201);
    } catch (Exception $e) {
        logActivity("Community post error: " . $e->getMessage(), 'ERROR');
        sendError('Database error: ' . $e->getMessage(), 500);
    }
} else {
    sendError('Method not allowed', 405);
}
?>