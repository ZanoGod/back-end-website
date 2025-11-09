import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Recipe } from "../types";
import { CUISINE_TYPES } from "../types";

const Recipes: React.FC = () => {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/recipes.php");
      const data = await response.json();
      if (data.success) {
        setRecipes(data.data);
      }
    } catch (error) {
      console.error("Fetch recipes error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cuisines = useMemo(
    () => ["All", ...CUISINE_TYPES],
    []
  );
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      return (
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (cuisine === "All" || recipe.cuisine === cuisine) &&
        (difficulty === "All" || recipe.difficulty === difficulty)
      );
    });
  }, [recipes, searchTerm, cuisine, difficulty]);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="mb-6">
          <span className="inline-block px-6 py-2 bg-gradient-primary/20 backdrop-blur-sm rounded-full text-sm font-medium border border-brand-primary/30 mb-8 text-brand-primary">
            🍳 Recipe Collection
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-white via-brand-primary-light to-brand-secondary bg-clip-text text-transparent mb-6">
          Explore Recipes
        </h1>
        <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed">
          Filter by cuisine, dietary preferences, or cooking difficulty to find your perfect dish.
        </p>
        <div className="w-32 h-1 bg-gradient-primary mx-auto mt-8 rounded-full"></div>
      </div>

      <div className="bg-brand-surface/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl mb-16 sticky top-[80px] z-40 border border-brand-surface/30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent text-white placeholder-gray-400 transition-all"
          />
          <select
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
          >
            {cuisines.map((c) => (
              <option key={c} value={c} className="bg-brand-dark text-white">
                {c === "All" ? "All Cuisines" : c}
              </option>
            ))}
          </select>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full p-4 bg-brand-dark/50 backdrop-blur-sm border border-brand-surface/50 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all"
          >
            {difficulties.map((d) => (
              <option key={d} value={d} className="bg-brand-dark text-white">
                {d === "All" ? "All Difficulties" : d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mb-4"></div>
          <p className="text-gray-300 text-lg">Loading recipes...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-brand-surface/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer border border-brand-surface/30 group"
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                {recipe.image_url && (
                  <div className="relative overflow-hidden">
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-primary-light transition-colors">
                    {recipe.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {recipe.description}
                  </p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="inline-block px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-medium rounded-full border border-brand-primary/30">
                      {recipe.cuisine || "N/A"}
                    </span>
                    <span className="text-xs text-gray-400">{recipe.difficulty}</span>
                  </div>
                  <div className="text-xs text-gray-400 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    By {recipe.first_name} {recipe.last_name}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-300 text-xl mb-2">No recipes found</p>
              <p className="text-gray-400">Try adjusting your filters to discover more delicious recipes!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
