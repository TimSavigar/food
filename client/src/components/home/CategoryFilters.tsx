import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CategoryFilters = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All', icon: '🍽️' },
    { id: 'breakfast', name: 'Breakfast', icon: '🥞' },
    { id: 'lunch', name: 'Lunch', icon: '🥪' },
    { id: 'dinner', name: 'Dinner', icon: '🍝' },
    { id: 'dessert', name: 'Dessert', icon: '🍰' },
    { id: 'snack', name: 'Snacks', icon: '🥨' },
    { id: 'vegetarian', name: 'Vegetarian', icon: '🥗' },
    { id: 'vegan', name: 'Vegan', icon: '🌱' },
    { id: 'gluten-free', name: 'Gluten-Free', icon: '🌾' },
    { id: 'quick', name: 'Quick & Easy', icon: '⚡' },
    { id: 'healthy', name: 'Healthy', icon: '💚' },
    { id: 'comfort', name: 'Comfort Food', icon: '🍲' }
  ]

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Browse by Category
          </h2>
          <p className="text-gray-600">
            Find the perfect recipe for any occasion or dietary preference
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const MotionButton = motion.button as React.ComponentType<any>;
            return (
            <MotionButton
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setActiveCategory(category.id)}
              className={`p-4 rounded-lg text-center transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-orange-50 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{category.icon}</div>
              <div className="text-sm font-medium">{category.name}</div>
            </MotionButton>
          )})}
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 text-sm text-gray-600">
            <span>Popular filters:</span>
            <button className="px-3 py-1 bg-white rounded-full hover:bg-orange-50 transition-colors">
              Under 30 min
            </button>
            <button className="px-3 py-1 bg-white rounded-full hover:bg-orange-50 transition-colors">
              High protein
            </button>
            <button className="px-3 py-1 bg-white rounded-full hover:bg-orange-50 transition-colors">
              Low carb
            </button>
            <button className="px-3 py-1 bg-white rounded-full hover:bg-orange-50 transition-colors">
              Budget-friendly
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CategoryFilters 