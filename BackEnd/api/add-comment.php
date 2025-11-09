<?php
// api/add-comment.php - Add comment to a community post

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
    if (!$input || !isset($input['post_id']) || !isset($input['comment'])) {
        sendError('Post ID and comment are required', 400);
    }

    $comment = trim($input['comment']);
    if (empty($comment)) {
        sendError('Comment cannot be empty', 400);
    }

    $pdo = getDbConnection();
    $userId = $user['sub'];
    $postId = $input['post_id'];

    $stmt = $pdo->prepare("INSERT INTO community_comments (post_id, user_id, comment) VALUES (?, ?, ?)");
    $stmt->execute([$postId, $userId, $comment]);

    sendSuccess(null, 'Comment added successfully');

} catch (Exception $e) {
    logActivity("Add comment error: " . $e->getMessage(), 'ERROR');
    sendError('Error: ' . $e->getMessage(), 500);
}
?>