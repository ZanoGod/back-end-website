<?php
// api/post-detail.php - Get individual post details with likes and comments

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
    $postId = $_GET['id'] ?? null;
    if (!$postId) {
        sendError('Post ID is required', 400);
    }

    $pdo = getDbConnection();
    
    // Get post with user info, like count, and comment count
    $sql = "SELECT 
                p.*,
                u.first_name,
                u.last_name,
                (SELECT COUNT(*) FROM community_likes WHERE post_id = p.id) as like_count,
                (SELECT COUNT(*) FROM community_comments WHERE post_id = p.id) as comment_count,
                (SELECT GROUP_CONCAT(CONCAT(u2.first_name, ' ', u2.last_name) SEPARATOR ', ') 
                 FROM community_likes cl 
                 JOIN users u2 ON cl.user_id = u2.id 
                 WHERE cl.post_id = p.id 
                 LIMIT 5) as liked_by,
                (SELECT GROUP_CONCAT(CONCAT(u3.first_name, ' ', u3.last_name, ': ', cc.comment) SEPARATOR ' | ') 
                 FROM community_comments cc 
                 JOIN users u3 ON cc.user_id = u3.id 
                 WHERE cc.post_id = p.id 
                 ORDER BY cc.created_at DESC 
                 LIMIT 10) as comments
            FROM community_posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = ?";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$postId]);
    $post = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$post) {
        sendError('Post not found', 404);
    }

    sendSuccess($post);

} catch (Exception $e) {
    logActivity("Get post detail error: " . $e->getMessage(), 'ERROR');
    sendError('Error fetching post details', 500);
}
?>