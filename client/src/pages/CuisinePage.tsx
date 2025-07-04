import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Search, Filter, Clock, Users, Star, Heart, Globe } from 'lucide-react';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
}

const CuisinePage: React.FC = () => {
  const { cuisine } = useParams<{ cuisine: string }>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedDiet, setSelectedDiet] = useState('');
  const [sortBy, setSortBy] = useState('popular');

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const diets = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Keto', 'Paleo', 'Dairy-Free'];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'time', label: 'Quickest' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Cuisine-specific content
  const cuisineInfo = {
    italian: {
      name: 'Italian',
      description: 'Italian cuisine is beloved for its regional diversity – from hearty pastas of the north to bright seafood dishes of the south, and of course classics like pizza and gelato. Explore our collection of authentic Italian recipes, traditional favorites and modern twists, to bring la dolce vita to your kitchen.',
      heroImage: '🍝',
      popularDishes: ['Pasta Carbonara', 'Margherita Pizza', 'Tiramisu', 'Risotto', 'Bruschetta']
    },
    mexican: {
      name: 'Mexican',
      description: 'Discover the vibrant flavors of Mexican cuisine with our collection of authentic recipes. From traditional tacos and enchiladas to modern interpretations, explore the rich culinary heritage of Mexico with easy-to-follow recipes that bring the fiesta to your table.',
      heroImage: '🌮',
      popularDishes: ['Tacos al Pastor', 'Guacamole', 'Churros', 'Mole Poblano', 'Chiles Rellenos']
    },
    asian: {
      name: 'Asian',
      description: 'Explore the diverse and delicious world of Asian cuisine. From the umami-rich dishes of Japan to the bold flavors of Thailand, discover authentic recipes that showcase the incredible variety and depth of Asian cooking traditions.',
      heroImage: '🍜',
      popularDishes: ['Pad Thai', 'Sushi Rolls', 'Kung Pao Chicken', 'Pho', 'Bibimbap']
    },
    indian: {
      name: 'Indian',
      description: 'Experience the aromatic spices and rich flavors of Indian cuisine. From creamy curries to fluffy naan bread, our collection features both traditional recipes and modern interpretations that celebrate the incredible diversity of Indian cooking.',
      heroImage: '🍛',
      popularDishes: ['Butter Chicken', 'Biryani', 'Naan Bread', 'Tikka Masala', 'Gulab Jamun']
    }
  };

  const currentCuisine = cuisineInfo[cuisine as keyof typeof cuisineInfo] || {
    name: cuisine ? cuisine.charAt(0).toUpperCase() + cuisine.slice(1) : 'Cuisine',
    description: `Explore our collection of ${cuisine || ''} recipes, featuring traditional favorites and modern twists.`,
    heroImage: '🍽️',
    popularDishes: []
  };

  useEffect(() => {
    if (cuisine) {
      fetchCuisineRecipes();
    }
  }, [cuisine]);

  const fetchCuisineRecipes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recipes?cuisine=${cuisine}`);
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      }
    } catch (error) {
      console.error('Error fetching cuisine recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
    const matchesDiet = !selectedDiet || recipe.tags.includes(selectedDiet);
    
    return matchesSearch && matchesDifficulty && matchesDiet;
  });

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'time':
        return (a.prepTime + a.cookTime) - (b.prepTime + b.cookTime);
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDifficulty('');
    setSelectedDiet('');
    setSortBy('popular');
  };

  return (
    <>
      <Helmet>
        <title>{currentCuisine.name} Recipes - Recipe Ideas</title>
        <meta name="description" content={currentCuisine.description} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-6xl mb-4">{currentCuisine.heroImage}</div>
              <h1 className="text-4xl font-bold mb-4">{currentCuisine.name} Recipes</h1>
              <p className="text-xl mb-8 max-w-3xl mx-auto">{currentCuisine.description}</p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={`Search ${currentCuisine.name} recipes...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Dishes */}
        {currentCuisine.popularDishes.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Popular {currentCuisine.name} Dishes</h2>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {currentCuisine.popularDishes.map((dish, index) => (
                  <div key={index} className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl mb-2">🍽️</div>
                    <h3 className="font-semibold text-gray-900 text-sm">{dish}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters and Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              {/* Difficulty Filter */}
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Difficulties</option>
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>{difficulty}</option>
                ))}
              </select>

              {/* Diet Filter */}
              <select
                value={selectedDiet}
                onChange={(e) => setSelectedDiet(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">All Diets</option>
                {diets.map(diet => (
                  <option key={diet} value={diet}>{diet}</option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>

              {/* Clear Filters */}
              {(selectedDifficulty || selectedDiet || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {sortedRecipes.length} of {recipes.length} {currentCuisine.name} recipes
            </p>
          </div>

          {/* Recipe Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : sortedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedRecipes.map((recipe) => (
                <div key={recipe._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
                  {/* Recipe Image */}
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                    <div className="text-center text-white p-4">
                      <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                      <p className="text-orange-100 text-sm">{recipe.cuisine}</p>
                    </div>
                  </div>

                  {/* Recipe Info */}
                  <div className="p-4">
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {recipe.description}
                    </p>

                    {/* Recipe Meta */}
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{recipe.prepTime + recipe.cookTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{recipe.servings} servings</span>
                      </div>
                    </div>

                    {/* Rating */}
                    {recipe.rating && (
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(recipe.rating!) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          ({recipe.reviewCount || 0})
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {recipe.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                        View Recipe
                      </button>
                      <button className="text-gray-400 hover:text-red-500">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Globe className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {currentCuisine.name} recipes found</h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CuisinePage; 