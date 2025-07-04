import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Users, Star, Heart, Share2, Printer, Bookmark, ChefHat, Utensils, Timer } from 'lucide-react';

interface Recipe {
  _id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  cuisine: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  tags: string[];
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
  author?: string;
  nutritionInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
}

const RecipePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [cookMode, setCookMode] = useState(false);
  const [servings, setServings] = useState(4);
  const [checkedIngredients, setCheckedIngredients] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recipes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setRecipe(data);
        setServings(data.servings);
      }
    } catch (error) {
      console.error('Error fetching recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleIngredient = (index: number) => {
    const newChecked = new Set(checkedIngredients);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedIngredients(newChecked);
  };

  const adjustServings = (newServings: number) => {
    if (newServings > 0) {
      setServings(newServings);
    }
  };

  const scaleIngredient = (ingredient: string, originalServings: number) => {
    const scale = servings / originalServings;
    // This is a simple scaling - in a real app you'd want more sophisticated ingredient parsing
    return ingredient;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
          <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{recipe.title} - Recipe Ideas</title>
        <meta name="description" content={recipe.description} />
        <meta property="og:title" content={recipe.title} />
        <meta property="og:description" content={recipe.description} />
        {recipe.imageUrl && <meta property="og:image" content={recipe.imageUrl} />}
      </Helmet>

      <div className={`min-h-screen ${cookMode ? 'bg-white' : 'bg-gray-50'}`}>
        {/* Cook Mode Toggle */}
        {!cookMode && (
          <div className="bg-orange-600 text-white py-2">
            <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
              <span className="text-sm">Ready to cook?</span>
              <button
                onClick={() => setCookMode(true)}
                className="flex items-center gap-2 px-4 py-1 bg-white text-orange-600 rounded-md text-sm font-medium hover:bg-orange-50"
              >
                <ChefHat className="w-4 h-4" />
                Enter Cook Mode
              </button>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Recipe Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
                <p className="text-gray-600 text-lg mb-4">{recipe.description}</p>
                
                {/* Recipe Meta */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Prep: {recipe.prepTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Timer className="w-4 h-4" />
                    <span>Cook: {recipe.cookTime} min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{recipe.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>

                {/* Rating */}
                {recipe.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(recipe.rating!) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {recipe.rating.toFixed(1)} ({recipe.reviewCount || 0} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                                 <button className="p-2 text-gray-400 hover:text-green-500 transition-colors">
                   <Printer className="w-5 h-5" />
                 </button>
                <button className="p-2 text-gray-400 hover:text-purple-500 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-orange-100 text-orange-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Servings Adjuster */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Adjust Servings</h3>
                <p className="text-sm text-gray-600">Scale the recipe to your needs</p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => adjustServings(servings - 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">{servings}</span>
                <button
                  onClick={() => adjustServings(servings + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Ingredients */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Ingredients</h2>
              <div className="space-y-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <label
                    key={index}
                    className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={checkedIngredients.has(index)}
                      onChange={() => toggleIngredient(index)}
                      className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className={`flex-1 ${checkedIngredients.has(index) ? 'line-through text-gray-500' : ''}`}>
                      {scaleIngredient(ingredient, recipe.servings)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Instructions</h2>
              <div className="space-y-6">
                {recipe.instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nutrition Information */}
          {recipe.nutritionInfo && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nutrition Information</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {recipe.nutritionInfo.calories && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{recipe.nutritionInfo.calories}</div>
                    <div className="text-sm text-gray-500">Calories</div>
                  </div>
                )}
                {recipe.nutritionInfo.protein && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{recipe.nutritionInfo.protein}g</div>
                    <div className="text-sm text-gray-500">Protein</div>
                  </div>
                )}
                {recipe.nutritionInfo.carbs && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{recipe.nutritionInfo.carbs}g</div>
                    <div className="text-sm text-gray-500">Carbs</div>
                  </div>
                )}
                {recipe.nutritionInfo.fat && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{recipe.nutritionInfo.fat}g</div>
                    <div className="text-sm text-gray-500">Fat</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tips and Notes */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tips & Notes</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  💡
                </div>
                <p className="text-gray-700">
                  This recipe is perfect for meal prep and can be stored in the refrigerator for up to 3 days.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  🔥
                </div>
                <p className="text-gray-700">
                  For a spicier version, add an extra teaspoon of chili powder or red pepper flakes.
                </p>
              </div>
            </div>
          </div>

          {/* Related Recipes */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Similar Recipe 1</h3>
                <p className="text-sm text-gray-600">A delicious variation of this dish</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Similar Recipe 2</h3>
                <p className="text-sm text-gray-600">Another great option to try</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Similar Recipe 3</h3>
                <p className="text-sm text-gray-600">Perfect for the same occasion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipePage; 