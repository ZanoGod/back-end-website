
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const difficultyColors = {
  Easy: 'bg-green-500/20 text-green-400 border-green-500/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Hard: 'bg-red-500/20 text-red-400 border-red-500/30',
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="bg-brand-surface/50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden transform hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group border border-brand-surface/30">
      <div className="relative overflow-hidden">
        <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm border ${difficultyColors[recipe.difficulty]}`}>
          {recipe.difficulty}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-3 py-1 bg-brand-primary/80 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {recipe.cuisine}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mt-1 group-hover:text-brand-primary-light transition-colors duration-300 leading-tight">{recipe.title}</h3>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>30 min</span>
          </div>
          <button className="text-brand-primary hover:text-brand-primary-light transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
