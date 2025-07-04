import { motion } from 'framer-motion'
import { Search, ChefHat } from 'lucide-react'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 to-yellow-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center mb-6">
              <ChefHat className="w-16 h-16 text-orange-500" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Amazing
              <span className="text-orange-500"> Recipes</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Explore thousands of AI-generated recipes, filter by ingredients, dietary preferences, 
              and cooking styles. Perfect for food enthusiasts looking for inspiration.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                🥗 Vegetarian
              </span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                🌱 Vegan
              </span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                ⚡ Quick & Easy
              </span>
              <span className="bg-white px-3 py-1 rounded-full shadow-sm">
                🍰 Desserts
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection 