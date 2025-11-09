import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipeView: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/recipe-detail.php?id=${id}`);
      const data = await response.json();
      if (data.success) {
        setRecipe(data.data);
      }
    } catch (error) {
      console.error('Fetch recipe error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-6 py-12 text-center">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="container mx-auto px-6 py-12 text-center">Recipe not found</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        ← Back
      </button>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {recipe.image_url && (
          <img src={recipe.image_url} alt={recipe.title} className="w-full h-64 object-cover" />
        )}
        
        <div className="p-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-4">{recipe.title}</h1>
          <p className="text-gray-600 mb-6">{recipe.description}</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="flex gap-6 text-sm text-gray-900 mb-6">
                <span>Cuisine: {recipe.cuisine || 'N/A'}</span>
                <span>Difficulty: {recipe.difficulty}</span>
                <span>Prep: {recipe.prep_time}min</span>
                <span>Cook: {recipe.cook_time}min</span>
                <span>Servings: {recipe.servings}</span>
              </div>
              
              <h3 className="text-xl text-brand-gray-dark   font-semibold mb-4">Ingredients</h3>
              <div className="bg-gray-50 p-4 text-brand-gray-dark  rounded-lg mb-6">
                {recipe.ingredients ? recipe.ingredients.split(',').map((ingredient: string, index: number) => (
                  <div key={index} className="mb-2">• {ingredient.trim()}</div>
                )) : <div className="text-gray-500">No ingredients listed</div>}
              </div>
            </div>
            
            <div>
              <h3 className="text-xl text-brand-gray-dark font-semibold mb-4">Instructions</h3>
              <div className="bg-gray-50 p-4 text-brand-gray-dark  rounded-lg">
                {recipe.instructions ? recipe.instructions.split('\n').map((step: string, index: number) => (
                  <div key={index} className="mb-3">{step}</div>
                )) : <div className="text-gray-800">No instructions provided</div>}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              By {recipe.first_name} {recipe.last_name} • Created {new Date(recipe.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;