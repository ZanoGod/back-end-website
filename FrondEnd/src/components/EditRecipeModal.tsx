import React, { useState } from 'react';
import { CUISINE_TYPES } from '../types';

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
}

interface EditRecipeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onSave: (recipeId: number, data: any) => void;
}

const EditRecipeModal: React.FC<EditRecipeModalProps> = ({ recipe, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: recipe.title,
    description: recipe.description,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    cuisine: recipe.cuisine,
    difficulty: recipe.difficulty,
    prep_time: recipe.prep_time,
    cook_time: recipe.cook_time,
    servings: recipe.servings,
    image_url: recipe.image_url || ''
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    
    setSaving(true);
    try {
      await onSave(recipe.id, formData);
      onClose();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-brand-dark">Edit Recipe</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2  text-brand-dark focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine</label>
              <select
                value={formData.cuisine}
                onChange={(e) => setFormData({...formData, cuisine: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-brand-dark focus:border-transparent bg-white"
              >
                <option value="">Select Cuisine Type</option>
                {CUISINE_TYPES.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2  text-brand-dark focus:border-transparent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prep (min)</label>
                <input
                  type="number"
                  value={formData.prep_time}
                  onChange={(e) => setFormData({...formData, prep_time: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded text-brand-dark focus:ring-2  focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cook (min)</label>
                <input
                  type="number"
                  value={formData.cook_time}
                  onChange={(e) => setFormData({...formData, cook_time: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-brand-dark focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servings</label>
                <input
                  type="number"
                  value={formData.servings}
                  onChange={(e) => setFormData({...formData, servings: parseInt(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-brand-dark focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({...formData, image_url: e.target.value})}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2  text-brand-dark focus:border-transparent"
              placeholder="https://example.com/recipe-image.jpg"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-brand-dark focus:border-transparent"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
            <textarea
              value={formData.ingredients}
              onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-brand-dark focus:border-transparent"
            />
          </div>
          
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
            <textarea
              value={formData.instructions}
              onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 text-brand-dark focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSave}
              disabled={saving || !formData.title.trim()}
              className="flex-1 px-4 py-2 bg-brand-orange text-white rounded hover:bg-brand-accent disabled:opacity-80"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-brand-dark rounded border-brand-primary-light hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipeModal;