<?php
// api/edit-post.php - Edit community post

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
    if (!$input || !isset($input['post_id']) || !isset($input['title'])) {
        sendError('Post ID and title are required', 400);
    }

    $pdo = getDbConnection();
    $userId = $user['sub'];
    $postId = $input['post_id'];

    // Check if user owns the post
    $stmt = $pdo->prepare("SELECT user_id FROM community_posts WHERE id = ?");
    $stmt->execute([$postId]);
    $post = $stmt->fetch();

    if (!$post || $post['user_id'] != $userId) {
        sendError('Post not found or access denied', 403);
    }

    // Update post
    $stmt = $pdo->prepare("UPDATE community_posts SET title = ?, caption = ?, photo_url = ?, updated_at = NOW() WHERE id = ? AND user_id = ?");
    $stmt->execute([
        $input['title'],
        $input['caption'] ?? null,
        $input['photo_url'] ?? null,
        $postId,
        $userId
    ]);

    sendSuccess(null, 'Post updated successfully');

} catch (Exception $e) {
    logActivity("Edit post error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred', 500);
}
?>