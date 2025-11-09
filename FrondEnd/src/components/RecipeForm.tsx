import React, { useState } from "react";
import { CUISINE_TYPES } from "../types";

interface RecipeFormProps {
  onSuccess: () => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cuisine: "",
    diet: "",
    difficulty: "Medium",
    level: "Beginner",
    prep_time: "",
    cook_time: "",
    servings: "",
    ingredients: "",
    instructions: "",
    image_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8080/api/recipes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Recipe created successfully!");
        setFormData({
          title: "",
          description: "",
          cuisine: "",
          diet: "",
          difficulty: "Medium",
          level: "Beginner",
          prep_time: "",
          cook_time: "",
          servings: "",
          ingredients: "",
          instructions: "",
          image_url: "",
        });
        onSuccess();
      } else {
        setMessage(data.message || "Failed to create recipe");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
          ✨ Create Your Recipe Masterpiece
        </h2>
        <p className="text-gray-600">Share your culinary creation with the world</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-black text-sm mr-3">1</span>
            Basic Information
          </h3>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Recipe Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
              />
            </div>

            <textarea
              placeholder="Describe your recipe..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none text-black"
            />
          </div>
        </div>

        {/* Recipe Details Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm mr-3">2</span>
            Recipe Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <select
              value={formData.cuisine}
              onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
              required
              className="p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-black"
            >
              <option value="">🌍 Select Cuisine Type</option>
              {CUISINE_TYPES.map((cuisine) => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="🥗 Diet Type (e.g., Vegetarian, Vegan)"
              value={formData.diet}
              onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
              className="p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
              className="p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-black"
            >
              <option value="Easy">😊 Easy</option>
              <option value="Medium">🤔 Medium</option>
              <option value="Hard">😤 Hard</option>
            </select>

            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-black"
            >
              <option value="Beginner">🌱 Beginner</option>
              <option value="Intermediate">🔥 Intermediate</option>
              <option value="Advanced">⭐ Advanced</option>
              <option value="Expert">👑 Expert</option>
            </select>

            <input
              type="number"
              placeholder="⏱️ Prep (min)"
              value={formData.prep_time}
              onChange={(e) => setFormData({ ...formData, prep_time: e.target.value })}
              className="p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
            />

            <input
              type="number"
              placeholder="🍳 Cook (min)"
              value={formData.cook_time}
              onChange={(e) => setFormData({ ...formData, cook_time: e.target.value })}
              className="p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
            />
          </div>

          <input
            type="number"
            placeholder="👥 Number of Servings"
            value={formData.servings}
            onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
            className="w-full mt-4 p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
          />
        </div>

        {/* Ingredients & Instructions Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white text-sm mr-3">3</span>
              Ingredients
            </h3>

            <textarea
              placeholder="🥕 List ingredients (one per line)&#10;• 2 cups flour&#10;• 1 tsp salt&#10;• 3 eggs"
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              required
              rows={8}
              className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none text-black"
            />
          </div>

          <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm mr-3">4</span>
              Instructions
            </h3>

            <textarea
              placeholder="📝 Step-by-step instructions&#10;1. Preheat oven to 350°F&#10;2. Mix dry ingredients&#10;3. Add wet ingredients"
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              required
              rows={8}
              className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 resize-none text-black"
            />
          </div>
        </div>

        {/* Image Section */}
        <div className="backdrop-blur-sm bg-white/90 rounded-2xl p-6 border border-white/20 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm mr-3">5</span>
            Recipe Image
          </h3>

          <input
            type="url"
            placeholder="📸 Image URL (optional)"
            value={formData.image_url}
            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            className="w-full p-4 bg-white/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder-gray-500 text-black"
          />
        </div>

        {/* Message & Submit */}
        {message && (
          <div className={`p-4 rounded-xl text-center font-medium ${
            message.includes("success") 
              ? "bg-green-100 text-green-700 border border-green-200" 
              : "bg-red-100 text-red-700 border border-red-200"
          }`}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Recipe...
            </span>
          ) : (
            "🚀 Create Recipe"
          )}
        </button>
      </form>
    </div>
  );
};

export default RecipeForm;
