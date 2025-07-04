import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  imageUrl?: string;
  tags: string[];
}

const HomePage: React.FC = () => {
  const [recipeOfTheDay, setRecipeOfTheDay] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipeOfTheDay();
  }, []);

  const fetchRecipeOfTheDay = async () => {
    try {
      const response = await fetch('/api/recipes');
      if (response.ok) {
        const recipes = await response.json();
        if (recipes.length > 0) {
          // Select a random recipe as recipe of the day
          const randomIndex = Math.floor(Math.random() * recipes.length);
          setRecipeOfTheDay(recipes[randomIndex]);
        }
      }
    } catch (error) {
      console.error('Error fetching recipe of the day:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Amazing
              <span className="block text-orange-600">Recipe Ideas</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore thousands of delicious recipes, from quick weeknight dinners to 
              impressive weekend feasts. Find your next favorite dish today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/recipes"
                className="bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Browse All Recipes
              </Link>
              <Link
                to="/recipes?cuisine=italian"
                className="border-2 border-orange-600 text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 hover:text-white transition-colors"
              >
                Italian Favorites
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe of the Day Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Recipe of the Day</h2>
            <p className="text-gray-600 text-lg">Today's featured recipe to inspire your cooking</p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : recipeOfTheDay ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <div className="h-64 md:h-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-3xl font-bold mb-2">{recipeOfTheDay.title}</h3>
                        <p className="text-orange-100 mb-4">{recipeOfTheDay.cuisine}</p>
                        <div className="flex justify-center space-x-4 text-sm">
                          <span>⏱️ {recipeOfTheDay.prepTime + recipeOfTheDay.cookTime} min</span>
                          <span>👥 {recipeOfTheDay.servings} servings</span>
                          <span>📊 {recipeOfTheDay.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8">
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {recipeOfTheDay.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {recipeOfTheDay.tags.slice(0, 5).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      to={`/recipe/${recipeOfTheDay._id}`}
                      className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                      View Recipe
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <p>No recipe of the day available</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Recipe Ideas?</h2>
            <p className="text-gray-600 text-lg">Everything you need to create amazing meals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy to Follow</h3>
              <p className="text-gray-600">
                Step-by-step instructions that make cooking simple and enjoyable
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Cuisines</h3>
              <p className="text-gray-600">
                Explore recipes from around the world, from Italian to Asian
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quick & Easy</h3>
              <p className="text-gray-600">
                Find recipes that fit your schedule, from 15-minute meals to weekend projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Cooking?</h2>
          <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of home cooks who discover new recipes every day
          </p>
          <Link
            to="/recipes"
            className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Recipes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 