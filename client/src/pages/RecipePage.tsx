import { Helmet } from 'react-helmet-async'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Clock, Users, Star, Heart, Share2, Printer, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Ingredient {
  name: string
  amount: string
  unit: string
  category: string
}

interface Nutrition {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

interface RelatedRecipe {
  name: string
  slug: string
  image: string
}

interface Recipe {
  id: string
  slug: string
  name: string
  description: string
  imageUrl: string
  prepTime: number
  cookTime: number
  totalTime: number
  servings: number
  difficulty: string
  cuisine: string
  rating: number
  reviewCount: number
  ingredients: Ingredient[]
  instructions: string[]
  nutrition: Nutrition
  tags: string[]
  dietary: string[]
  allergens: string[]
  tips: string[]
  variations: string[]
  relatedRecipes: RelatedRecipe[]
}

const RecipePage = () => {
  const { slug } = useParams()
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('ingredients')

  // Mock recipe data - replace with API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRecipe({
        id: '1',
        slug: slug || 'default-slug',
        name: 'Easy Chocolate Chip Cookies Recipe',
        description: 'This classic Chocolate Chip Cookies recipe yields chewy, gooey cookies in just 30 minutes – a family favorite with simple ingredients.',
        imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800',
        prepTime: 15,
        cookTime: 12,
        totalTime: 27,
        servings: 24,
        difficulty: 'easy',
        cuisine: 'american',
        rating: 4.8,
        reviewCount: 156,
        ingredients: [
          { name: 'all-purpose flour', amount: '2', unit: 'cups', category: 'dry' },
          { name: 'baking soda', amount: '1/2', unit: 'tsp', category: 'leavening' },
          { name: 'salt', amount: '1/2', unit: 'tsp', category: 'seasoning' },
          { name: 'unsalted butter', amount: '1', unit: 'cup', category: 'dairy' },
          { name: 'granulated sugar', amount: '3/4', unit: 'cup', category: 'sweetener' },
          { name: 'brown sugar', amount: '3/4', unit: 'cup', category: 'sweetener' },
          { name: 'vanilla extract', amount: '1', unit: 'tsp', category: 'flavoring' },
          { name: 'eggs', amount: '2', unit: 'large', category: 'dairy' },
          { name: 'chocolate chips', amount: '2', unit: 'cups', category: 'add-ins' }
        ],
        instructions: [
          'Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.',
          'In a medium bowl, whisk together flour, baking soda, and salt.',
          'In a large bowl, cream together butter, granulated sugar, and brown sugar until light and fluffy.',
          'Beat in vanilla extract and eggs, one at a time.',
          'Gradually mix in the flour mixture until just combined.',
          'Stir in chocolate chips by hand.',
          'Drop rounded tablespoons of dough onto prepared baking sheets, spacing 2 inches apart.',
          'Bake for 10-12 minutes, or until edges are golden brown.',
          'Let cookies cool on baking sheets for 5 minutes before transferring to wire racks.'
        ],
        nutrition: {
          calories: 120,
          protein: 1.5,
          carbs: 15,
          fat: 6,
          fiber: 0.5
        },
        tags: ['dessert', 'cookies', 'chocolate', 'easy', 'family-friendly'],
        dietary: ['vegetarian'],
        allergens: ['gluten', 'dairy', 'eggs'],
        tips: [
          'For chewier cookies, slightly underbake them.',
          'You can freeze the dough for up to 3 months.',
          'Substitute chocolate chips with white chocolate or butterscotch chips for variety.'
        ],
        variations: [
          'Add 1/2 cup chopped nuts for extra crunch',
          'Use dark chocolate chips for a richer flavor',
          'Add 1/2 tsp cinnamon for a warm spice note'
        ],
        relatedRecipes: [
          { name: 'Oatmeal Raisin Cookies', slug: 'oatmeal-raisin-cookies', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
          { name: 'Peanut Butter Cookies', slug: 'peanut-butter-cookies', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' },
          { name: 'Sugar Cookies', slug: 'sugar-cookies', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400' }
        ]
      })
      setLoading(false)
    }, 1000)
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-96 bg-gray-200 rounded mb-8"></div>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Recipe Not Found</h1>
        <p className="text-gray-600">The recipe you're looking for doesn't exist.</p>
      </div>
    )
  }

  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    "name": recipe.name,
    "description": recipe.description,
    "image": recipe.imageUrl,
    "author": {
      "@type": "Organization",
      "name": "Recipe Ideas"
    },
    "datePublished": new Date().toISOString(),
    "dateModified": new Date().toISOString(),
    "prepTime": `PT${recipe.prepTime}M`,
    "cookTime": `PT${recipe.cookTime}M`,
    "totalTime": `PT${recipe.totalTime}M`,
    "recipeYield": `${recipe.servings} servings`,
    "recipeCategory": recipe.cuisine,
    "recipeCuisine": recipe.cuisine,
    "keywords": recipe.tags.join(', '),
    "recipeIngredient": recipe.ingredients.map(ing => `${ing.amount} ${ing.unit} ${ing.name}`),
    "recipeInstructions": recipe.instructions.map((instruction, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "text": instruction
    })),
    "nutrition": {
      "@type": "NutritionInformation",
      "calories": `${recipe.nutrition.calories} calories`,
      "proteinContent": `${recipe.nutrition.protein}g`,
      "carbohydrateContent": `${recipe.nutrition.carbs}g`,
      "fatContent": `${recipe.nutrition.fat}g`,
      "fiberContent": `${recipe.nutrition.fiber}g`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": recipe.rating,
      "reviewCount": recipe.reviewCount
    },
    "suitableForDiet": recipe.dietary,
    "recipeDifficulty": recipe.difficulty
  }

  return (
    <>
      <Helmet>
        <title>{`${recipe.name} | Recipe Ideas`}</title>
        <meta name="description" content={recipe.description} />
        <meta name="keywords" content={recipe.tags.join(', ')} />
        
        {/* Open Graph */}
        <meta property="og:title" content={recipe.name} />
        <meta property="og:description" content={recipe.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://recipe-ideas.food/recipe/${recipe.slug}`} />
        <meta property="og:image" content={recipe.imageUrl} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={recipe.name} />
        <meta name="twitter:description" content={recipe.description} />
        <meta name="twitter:image" content={recipe.imageUrl} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://recipe-ideas.food/recipe/${recipe.slug}`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://recipe-ideas.food"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Recipes",
                  "item": "https://recipe-ideas.food/recipes"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": recipe.name,
                  "item": `https://recipe-ideas.food/recipe/${recipe.slug}`
                }
              ]
            })
          }}
        />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-gray-700">Home</a>
          <ChevronRight className="w-4 h-4" />
          <a href="/recipes" className="hover:text-gray-700">Recipes</a>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{recipe.name}</span>
        </nav>

        {/* Recipe Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{recipe.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{recipe.description}</p>
          
          {/* Quick Info */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{recipe.totalTime} min</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">{recipe.servings} servings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-gray-700">{recipe.rating} ({recipe.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Heart className="w-4 h-4" />
              <span>Save Recipe</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </motion.div>

        {/* Recipe Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8"
        >
          <img
            src={recipe.imageUrl}
            alt={`${recipe.name} - A delicious homemade recipe`}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </motion.div>

        {/* Recipe Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-6">
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'ingredients'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Ingredients
              </button>
              <button
                onClick={() => setActiveTab('instructions')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'instructions'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Instructions
              </button>
              <button
                onClick={() => setActiveTab('tips')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'tips'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Tips & Variations
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'ingredients' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Ingredients</h2>
                  <ul className="space-y-3">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">
                          <strong>{ingredient.amount} {ingredient.unit}</strong> {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'instructions' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Instructions</h2>
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 leading-relaxed">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {activeTab === 'tips' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips & Variations</h2>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Pro Tips</h3>
                    <ul className="space-y-2">
                      {recipe.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Variations</h3>
                    <ul className="space-y-2">
                      {recipe.variations.map((variation, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{variation}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Nutrition Info */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nutrition Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Calories</span>
                  <span className="font-medium">{recipe.nutrition.calories}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Protein</span>
                  <span className="font-medium">{recipe.nutrition.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Carbs</span>
                  <span className="font-medium">{recipe.nutrition.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fat</span>
                  <span className="font-medium">{recipe.nutrition.fat}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fiber</span>
                  <span className="font-medium">{recipe.nutrition.fiber}g</span>
                </div>
              </div>
            </div>

            {/* Recipe Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipe Details</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Difficulty:</span>
                  <span className="ml-2 font-medium capitalize">{recipe.difficulty}</span>
                </div>
                <div>
                  <span className="text-gray-600">Cuisine:</span>
                  <span className="ml-2 font-medium capitalize">{recipe.cuisine}</span>
                </div>
                <div>
                  <span className="text-gray-600">Dietary:</span>
                  <div className="mt-1">
                    {recipe.dietary.map((diet, index) => (
                      <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
                {recipe.allergens.length > 0 && (
                  <div>
                    <span className="text-gray-600">Allergens:</span>
                    <div className="mt-1">
                      {recipe.allergens.map((allergen, index) => (
                        <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Recipes */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recipe.relatedRecipes.map((related, index) => (
              <a
                key={index}
                href={`/recipe/${related.slug}`}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={related.image}
                    alt={related.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {related.name}
                    </h3>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Section for SEO */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I freeze these cookies?</h3>
              <p className="text-gray-700">Yes! You can freeze the dough for up to 3 months. Simply scoop the dough into balls, freeze on a baking sheet, then transfer to a freezer bag.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I substitute butter with oil?</h3>
              <p className="text-gray-700">While possible, butter provides the best flavor and texture. If you must substitute, use 3/4 cup of vegetable oil for 1 cup of butter.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I make them chewier?</h3>
              <p className="text-gray-700">For chewier cookies, slightly underbake them and let them cool completely on the baking sheet before transferring.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RecipePage 