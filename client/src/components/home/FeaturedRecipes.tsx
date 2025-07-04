import { motion } from 'framer-motion'
import { Clock, Star, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

const FeaturedRecipes = () => {
  const featuredRecipes = [
    {
      id: 1,
      name: "Creamy Mushroom Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      time: "45 min",
      rating: 4.8,
      reviews: 124,
      difficulty: "Medium",
      cuisine: "Italian"
    },
    {
      id: 2,
      name: "Spicy Thai Green Curry",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
      time: "30 min",
      rating: 4.6,
      reviews: 89,
      difficulty: "Easy",
      cuisine: "Thai"
    },
    {
      id: 3,
      name: "Classic Beef Bourguignon",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      time: "2 hours",
      rating: 4.9,
      reviews: 156,
      difficulty: "Hard",
      cuisine: "French"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Recipes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and highly-rated recipes, carefully curated for your cooking inspiration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <Link to={`/recipe/${recipe.id}`}>
                <div className="relative">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1 text-xs font-medium">
                    {recipe.difficulty}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {recipe.name}
                  </h3>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{recipe.time}</span>
                    <span className="mx-2">•</span>
                    <span>{recipe.cuisine}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{recipe.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({recipe.reviews})</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      <span>4 servings</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/recipes"
            className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            View All Recipes
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedRecipes 