export const CUISINE_TYPES = [
  'Italian',
  'Chinese',
  'Japanese',
  'Thai',
  'Indian',
  'Mexican',
  'French',
  'American',
  'Mediterranean',
  'Korean',
  'Vietnamese',
  'Spanish',
  'Greek',
  'Turkish',
  'Lebanese',
  'Moroccan',
  'Brazilian',
  'Peruvian',
  'German',
  'British',
  'Russian',
  'Ethiopian',
  'Caribbean',
  'Fusion',
  'International',
  'Dessert'
] as const;

export type CuisineType = typeof CUISINE_TYPES[number];

export interface Recipe {
  id: number;
  title: string;
  imageUrl: string;
  cuisine: string;
  diet: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface CommunityPost {
  id: number;
  userEmail: string;
  timestamp: string;
  imageUrl: string;
  caption: string;
}
