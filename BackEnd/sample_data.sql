-- Sample data for FoodFusion database
USE myfoodfusion;

-- Note: Test categories have been removed and replaced with comprehensive cuisine types

-- Insert sample culinary resources (system resources)
INSERT INTO culinary_resources (user_id, title, description, link, is_system_resource) VALUES
(NULL, 'Gordon Ramsay MasterClass', 'Learn cooking techniques from world-renowned chef Gordon Ramsay', 'https://www.masterclass.com/classes/gordon-ramsay-teaches-cooking', TRUE),
(NULL, 'Serious Eats Food Lab', 'Science-based cooking techniques and recipes', 'https://www.seriouseats.com/the-food-lab', TRUE),
(NULL, 'King Arthur Baking', 'Professional baking techniques and recipes', 'https://www.kingarthurbaking.com/learn', TRUE),
(NULL, 'Bon Appétit Test Kitchen', 'Professional cooking tips and techniques', 'https://www.bonappetit.com/test-kitchen', TRUE);

-- Insert sample educational resources (system resources)
INSERT INTO educational_resources (user_id, title, description, link, is_system_resource) VALUES
(NULL, 'Culinary Institute of America', 'Professional culinary education and courses', 'https://www.ciachef.edu/', TRUE),
(NULL, 'Harvard Food Science Course', 'Science and cooking course from Harvard University', 'https://www.edx.org/course/science-cooking-from-haute-cuisine-to-soft-matter-science', TRUE),
(NULL, 'Food Network Cooking School', 'Online cooking classes and tutorials', 'https://www.foodnetwork.com/how-to', TRUE),
(NULL, 'Rouxbe Online Culinary School', 'Professional online cooking school', 'https://rouxbe.com/', TRUE),
(NULL, 'YouTube - Basics with Babish', 'Fundamental cooking techniques explained simply', 'https://www.youtube.com/playlist?list=PLopY4n17t8RD-xx0UdVqemiSa0sRfyX19', TRUE);

-- Insert sample recipes
INSERT INTO recipes (user_id, title, description, cuisine, diet, difficulty, level, prep_time, cook_time, servings, ingredients, instructions, image_url) VALUES
(1, 'Classic Spaghetti Carbonara', 'Traditional Italian pasta dish with eggs, cheese, and pancetta', 'Italian', 'Regular', 'Medium', 'Intermediate', 15, 20, 4, 
'400g spaghetti, 200g pancetta, 4 large eggs, 100g Pecorino Romano cheese, Black pepper, Salt', 
'1. Cook spaghetti in salted water. 2. Fry pancetta until crispy. 3. Mix eggs and cheese. 4. Combine hot pasta with pancetta, then add egg mixture off heat. 5. Toss quickly and serve immediately.',
'https://example.com/carbonara.jpg'),

(1, 'Chicken Tikka Masala', 'Creamy and flavorful Indian curry with tender chicken', 'Indian', 'Regular', 'Medium', 'Intermediate', 30, 25, 4,
'500g chicken breast, 1 cup yogurt, 2 tbsp garam masala, 1 can tomatoes, 1 cup heavy cream, 2 onions, 4 garlic cloves, 1 inch ginger, 2 tbsp tomato paste',
'1. Marinate chicken in yogurt and spices. 2. Cook chicken until done. 3. Sauté onions, garlic, ginger. 4. Add tomatoes and spices. 5. Add cream and chicken. 6. Simmer until thick.',
'https://example.com/tikka.jpg'),

(1, 'Pad Thai', 'Classic Thai stir-fried noodles with sweet and tangy sauce', 'Thai', 'Regular', 'Medium', 'Intermediate', 20, 15, 2,
'200g rice noodles, 200g shrimp, 2 eggs, 3 tbsp tamarind paste, 2 tbsp fish sauce, 2 tbsp palm sugar, bean sprouts, peanuts, lime',
'1. Soak noodles until soft. 2. Heat wok and scramble eggs. 3. Add shrimp and cook. 4. Add noodles and sauce. 5. Toss with bean sprouts. 6. Garnish with peanuts and lime.',
'https://example.com/padthai.jpg'),

(1, 'Greek Moussaka', 'Traditional Greek layered casserole with eggplant and meat sauce', 'Greek', 'Regular', 'Hard', 'Advanced', 45, 60, 6,
'2 large eggplants, 500g ground lamb, 1 onion, 2 cans tomatoes, 500ml béchamel sauce, 100g cheese, olive oil, herbs',
'1. Slice and salt eggplants. 2. Make meat sauce with lamb and tomatoes. 3. Fry eggplant slices. 4. Layer eggplant and meat. 5. Top with béchamel. 6. Bake until golden.',
'https://example.com/moussaka.jpg'),

(1, 'Chocolate Chip Cookies', 'Classic homemade chocolate chip cookies', 'Dessert', 'Vegetarian', 'Easy', 'Beginner', 15, 12, 24,
'2¼ cups flour, 1 tsp baking soda, 1 tsp salt, 1 cup butter, ¾ cup brown sugar, ¾ cup white sugar, 2 eggs, 2 tsp vanilla, 2 cups chocolate chips',
'1. Preheat oven to 375°F. 2. Mix dry ingredients. 3. Cream butter and sugars. 4. Add eggs and vanilla. 5. Combine wet and dry ingredients. 6. Fold in chocolate chips. 7. Bake 9-11 minutes.',
'https://example.com/cookies.jpg');

-- Insert sample community posts
INSERT INTO community_posts (user_id, title, photo_url, caption) VALUES
(1, 'My First Homemade Pizza!', 'https://example.com/pizza.jpg', 'Finally mastered the art of pizza dough! The secret is letting it rise for 24 hours. What are your pizza topping favorites? 🍕'),
(1, 'Sunday Brunch Spread', 'https://example.com/brunch.jpg', 'Spent the morning preparing this beautiful brunch for the family. Fresh croissants, eggs benedict, and homemade jam! #SundayBrunch #Homemade'),
(1, 'Thai Curry Night', 'https://example.com/curry.jpg', 'Made authentic green curry from scratch tonight! The aroma filled the whole house. Nothing beats homemade Thai food! 🌶️'),
(1, 'Greek Feast', 'https://example.com/greek.jpg', 'Celebrating with a traditional Greek dinner - moussaka, tzatziki, and fresh pita bread. Opa! 🇬🇷');