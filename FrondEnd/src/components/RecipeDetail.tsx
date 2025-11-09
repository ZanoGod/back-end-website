import React, { useState } from 'react';
import EditRecipeModal from './EditRecipeModal';

interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  cuisine: string;
  difficulty: string;
  prep_time: number;
  cook_time: number;
  servings: number;
  image_url?: string;
  created_at: string;
}

interface RecipeDetailProps {
  recipe: Recipe;
  onClose: () => void;
  onEdit?: (recipeId: number, data: any) => void;
  isOwner?: boolean;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose, onEdit, isOwner = false }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-brand-dark flex-1">{recipe.title}</h2>
            <div className="flex items-center gap-2">
              {isOwner && onEdit && (
                <button
                  onClick={() => setShowEditModal(true)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  Edit
                </button>
              )}
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
          </div>
          
          {recipe.image_url && (
            <img src={recipe.image_url} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
          )}
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-4">{recipe.description || 'No description available'}</p>
              
              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <span>Cuisine: {recipe.cuisine || 'N/A'}</span>
                <span>Difficulty: {recipe.difficulty || 'N/A'}</span>
                <span>Prep: {recipe.prep_time || 0}min</span>
                <span>Cook: {recipe.cook_time || 0}min</span>
                <span>Servings: {recipe.servings || 0}</span>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-black mb-2">Ingredients</h3>
                <div className="bg-gray-50 p-3 rounded">
                  {recipe.ingredients ? recipe.ingredients.split(',').map((ingredient, index) => (
                    <div key={index} className="mb-1">• {ingredient.trim()}</div>
                  )) : <div className="text-gray-500">No ingredients listed</div>}
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-black text-lg mb-2">Instructions</h3>
              <div className="bg-gray-50 p-3 rounded">
                {recipe.instructions ? recipe.instructions.split('\n').map((step, index) => (
                  <div key={index} className="mb-2">{step}</div>
                )) : <div className="text-gray-500">No instructions provided</div>}
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            Created: {new Date(recipe.created_at).toLocaleDateString()}
          </div>
        </div>
        
        {showEditModal && onEdit && (
          <EditRecipeModal
            recipe={recipe}
            onClose={() => setShowEditModal(false)}
            onSave={onEdit}
          />
        )}
      </div>
    </div>
  );
};

export default RecipeDetail;