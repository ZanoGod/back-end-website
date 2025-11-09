<?php
// api/like-post.php - Like/unlike a community post

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/jwt_auth.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendError('Method not allowed', 405);
}

try {
    $user = verifyAuthToken();
    if (!$user) {
        sendError('Unauthorized access', 401);
    }

    $input = getJsonInput();
    if (!$input || !isset($input['post_id'])) {
        sendError('Post ID is required', 400);
    }

    $pdo = getDbConnection();
    $userId = $user['sub'];
    $postId = $input['post_id'];

    // Check if already liked
    $stmt = $pdo->prepare("SELECT id FROM community_likes WHERE post_id = ? AND user_id = ?");
    $stmt->execute([$postId, $userId]);
    $existingLike = $stmt->fetch();

    if ($existingLike) {
        // Unlike
        $stmt = $pdo->prepare("DELETE FROM community_likes WHERE post_id = ? AND user_id = ?");
        $stmt->execute([$postId, $userId]);
        $message = 'Post unliked';
    } else {
        // Like
        $stmt = $pdo->prepare("INSERT INTO community_likes (post_id, user_id) VALUES (?, ?)");
        $stmt->execute([$postId, $userId]);
        $message = 'Post liked';
    }

    sendSuccess(null, $message);

} catch (Exception $e) {
    logActivity("Like post error: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), 500);
}
?>