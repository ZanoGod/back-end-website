<?php
// api/recipes.php - Recipes operations

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';
require_once __DIR__ . '/../utils/jwt_auth.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get all recipes
    try {
        $pdo = getDbConnection();
        
        $stmt = $pdo->prepare("
            SELECT r.*, u.first_name, u.last_name 
            FROM recipes r 
            JOIN users u ON r.user_id = u.id 
            ORDER BY r.created_at DESC
        ");
        $stmt->execute();
        $recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);

        sendSuccess($recipes, 'Recipes retrieved successfully');

    } catch (Exception $e) {
        logActivity("Recipes fetch error: " . $e->getMessage(), 'ERROR');
        sendError('An unexpected error occurred', 500);
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Create new recipe
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
        $stmt = $pdo->prepare("
            INSERT INTO recipes (user_id, title, description, ingredients, instructions, cuisine, difficulty, prep_time, cook_time, servings, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $user['sub'],
            $input['title'],
            $input['description'] ?? null,
            $input['ingredients'] ?? null,
            $input['instructions'] ?? null,
            $input['cuisine'] ?? null,
            $input['difficulty'] ?? 'Easy',
            $input['prep_time'] ?? 0,
            $input['cook_time'] ?? 0,
            $input['servings'] ?? 1,
            $input['image_url'] ?? null
        ]);
        sendSuccess(['recipe_id' => $pdo->lastInsertId()], 'Recipe created successfully', 201);
    } catch (Exception $e) {
        logActivity("Recipe creation error: " . $e->getMessage(), 'ERROR');
        sendError('Database error: ' . $e->getMessage(), 500);
    }
} else {
    sendError('Method not allowed', 405);
}
?>