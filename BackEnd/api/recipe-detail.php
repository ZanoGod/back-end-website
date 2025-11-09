<?php
// api/recipe-detail.php - Get single recipe details

header('Content-Type: application/json');

require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../utils/helpers.php';

setCorsHeaders();

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendError('Method not allowed', 405);
}

try {
    if (!isset($_GET['id'])) {
        sendError('Recipe ID is required', 400);
    }

    $pdo = getDbConnection();
    $recipeId = $_GET['id'];
    
    $stmt = $pdo->prepare("
        SELECT r.*, u.first_name, u.last_name 
        FROM recipes r 
        JOIN users u ON r.user_id = u.id 
        WHERE r.id = ?
    ");
    $stmt->execute([$recipeId]);
    $recipe = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$recipe) {
        sendError('Recipe not found', 404);
    }

    sendSuccess($recipe, 'Recipe retrieved successfully');

} catch (Exception $e) {
    logActivity("Recipe detail error: " . $e->getMessage(), 'ERROR');
    sendError('An unexpected error occurred', 500);
}
?>