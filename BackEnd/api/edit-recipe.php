<?php
// api/edit-recipe.php - Edit recipe

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
    if (!$input || !isset($input['recipe_id']) || !isset($input['title'])) {
        sendError('Recipe ID and title are required', 400);
    }

    $pdo = getDbConnection();
    $userId = $user['sub'];
    $recipeId = $input['recipe_id'];

    // Check ownership
    $stmt = $pdo->prepare("SELECT user_id FROM recipes WHERE id = ?");
    $stmt->execute([$recipeId]);
    $recipe = $stmt->fetch();

    if (!$recipe || $recipe['user_id'] != $userId) {
        sendError('Recipe not found or access denied', 403);
    }

    // Update recipe
    $stmt = $pdo->prepare("UPDATE recipes SET title = ?, description = ?, ingredients = ?, instructions = ?, cuisine = ?, difficulty = ?, prep_time = ?, cook_time = ?, servings = ?, image_url = ?, updated_at = NOW() WHERE id = ? AND user_id = ?");
    $stmt->execute([
        $input['title'],
        $input['description'] ?? null,
        $input['ingredients'] ?? null,
        $input['instructions'] ?? null,
        $input['cuisine'] ?? null,
        $input['difficulty'] ?? 'Easy',
        $input['prep_time'] ?? null,
        $input['cook_time'] ?? null,
        $input['servings'] ?? null,
        $input['image_url'] ?? null,
        $recipeId,
        $userId
    ]);

    sendSuccess(null, 'Recipe updated successfully');

} catch (Exception $e) {
    logActivity("Edit recipe error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred', 500);
}
?>