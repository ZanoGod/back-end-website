import type { Recipe, CommunityPost } from './types';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Recipes', path: '/recipes' },
  { name: 'Community', path: '/community' },
  { name: 'Culinary Resources', path: '/culinary-resources' },
  { name: 'Educational Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
];

export const MOCK_RECIPES: Recipe[] = [
  {
    id: 1,
    title: 'Classic Carbonara',
    imageUrl: 'https://picsum.photos/seed/carbonara/400/300',
    cuisine: 'Italian',
    diet: 'None',
    difficulty: 'Medium',
  },
  {
    id: 2,
    title: 'Spicy Margherita Pizza',
    imageUrl: 'https://picsum.photos/seed/pizza/400/300',
    cuisine: 'Italian',
    diet: 'Vegetarian',
    difficulty: 'Medium',
  },
  {
    id: 3,
    title: 'Gourmet Beef Burger',
    imageUrl: 'https://picsum.photos/seed/burger/400/300',
    cuisine: 'American',
    diet: 'None',
    difficulty: 'Easy',
  },
  {
    id: 4,
    title: 'Chicken Tikka Masala',
    imageUrl: 'https://picsum.photos/seed/tikka/400/300',
    cuisine: 'Indian',
    diet: 'None',
    difficulty: 'Medium',
  },
  {
    id: 5,
    title: 'Vegan Pad Thai',
    imageUrl: 'https://picsum.photos/seed/padthai/400/300',
    cuisine: 'Thai',
    diet: 'Vegan',
    difficulty: 'Hard',
  },
  {
    id: 6,
    title: 'Sushi Rolls',
    imageUrl: 'https://picsum.photos/seed/sushi/400/300',
    cuisine: 'Japanese',
    diet: 'None',
    difficulty: 'Hard',
  },
  {
    id: 7,
    title: 'Greek Salad',
    imageUrl: 'https://picsum.photos/seed/greek/400/300',
    cuisine: 'Greek',
    diet: 'Vegetarian',
    difficulty: 'Easy',
  },
  {
    id: 8,
    title: 'Korean Bibimbap',
    imageUrl: 'https://picsum.photos/seed/bibimbap/400/300',
    cuisine: 'Korean',
    diet: 'Vegetarian',
    difficulty: 'Medium',
  },
  {
    id: 9,
    title: 'French Ratatouille',
    imageUrl: 'https://picsum.photos/seed/ratatouille/400/300',
    cuisine: 'French',
    diet: 'Vegan',
    difficulty: 'Medium',
  },
  {
    id: 10,
    title: 'Mexican Tacos',
    imageUrl: 'https://picsum.photos/seed/tacos/400/300',
    cuisine: 'Mexican',
    diet: 'None',
    difficulty: 'Easy',
  },
  {
    id: 11,
    title: 'Chinese Fried Rice',
    imageUrl: 'https://picsum.photos/seed/friedrice/400/300',
    cuisine: 'Chinese',
    diet: 'Vegetarian',
    difficulty: 'Easy',
  },
  {
    id: 12,
    title: 'Chocolate Cake',
    imageUrl: 'https://picsum.photos/seed/cake/400/300',
    cuisine: 'Dessert',
    diet: 'Vegetarian',
    difficulty: 'Hard',
  },
];

export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
    {
        id: 1,
        userEmail: 'jackson123@gmail.com',
        timestamp: '2025-05-16 14:19:54',
        imageUrl: 'https://picsum.photos/seed/community1/600/400',
        caption: "My attempt at the gourmet beef burger! Turned out amazing."
    },
    {
        id: 2,
        userEmail: 'sara.chef@outlook.com',
        timestamp: '2025-05-16 11:30:12',
        imageUrl: 'https://picsum.photos/seed/community2/600/400',
        caption: "Perfect day for a fresh garden salad. So refreshing!"
    },
    {
        id: 3,
        userEmail: 'foodie.life@yahoo.com',
        timestamp: '2025-05-15 20:45:00',
        imageUrl: 'https://picsum.photos/seed/community3/600/400',
        caption: "Homemade spicy margherita pizza for dinner tonight. 🔥"
    }
];