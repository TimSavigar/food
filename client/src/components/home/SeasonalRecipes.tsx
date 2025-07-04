import { motion } from 'framer-motion'
import { Calendar, Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const SeasonalRecipes = () => {
  const seasonalRecipes = [
    {
      id: 1,
      name: "Pumpkin Spice Latte Cake",
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      time: "1 hour",
      rating: 4.7,
      season: "Fall",
      difficulty: "Medium"
    },
    {
      id: 2,
      name: "Fresh Spring Vegetable Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop",
      time: "45 min",
      rating: 4.5,
      season: "Spring",
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Grilled Summer Corn Salad",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
      time: "20 min",
      rating: 4.3,
      season: "Summer",
      difficulty: "Easy"
    }
  ]

  const getSeasonColor = (season: string) => {
    switch (season) {
      case 'Spring': return 'bg-green-100 text-green-800'
      case 'Summer': return 'bg-yellow-100 text-yellow-800'
      case 'Fall': return 'bg-orange-100 text-orange-800'
      case 'Winter': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-6 h-6 text-orange-500 mr-2" />
            <h2 className="text-3xl font-bold text-gray-900">
              Seasonal Favorites
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover recipes that celebrate the best ingredients of each season, 
            from fresh spring vegetables to cozy winter comfort foods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {seasonalRecipes.map((recipe, index) => (
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
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getSeasonColor(recipe.season)}`}>
                    {recipe.season}
                  </div>
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
                  </div>
                  
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{recipe.rating}</span>
                    <span className="text-sm text-gray-500 ml-1">/ 5</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Spring</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Summer</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Fall</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Winter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SeasonalRecipes 