import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { Search, Clock, Users, Star, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import HeroSection from '../components/home/HeroSection'
import FeaturedRecipes from '../components/home/FeaturedRecipes'
import CategoryFilters from '../components/home/CategoryFilters'
import SeasonalRecipes from '../components/home/SeasonalRecipes'
import NewsletterSignup from '../components/home/NewsletterSignup'

const HomePage = () => {
  const stats = [
    { label: 'Recipes', value: '10,000+', icon: Search },
    { label: 'Cooking Time', value: '15-60 min', icon: Clock },
    { label: 'Serving Size', value: '2-8 people', icon: Users },
    { label: 'Rating', value: '4.8/5', icon: Star },
  ]

  return (
    <>
      <Helmet>
        <title>Recipe Ideas - Discover Amazing AI-Generated Recipes for Food Enthusiasts</title>
        <meta name="description" content="Explore thousands of AI-generated recipes, filter by ingredients, dietary preferences, cooking styles, and more. Perfect for food enthusiasts looking for inspiration." />
        <meta name="keywords" content="recipes, cooking, food, AI recipes, meal ideas, cooking inspiration, dietary recipes, vegetarian, vegan, gluten-free, quick recipes, easy cooking" />
        <meta property="og:title" content="Recipe Ideas - Discover Amazing Recipes" />
        <meta property="og:description" content="Explore thousands of AI-generated recipes for every occasion and dietary preference." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://recipe-ideas.food" />
        <link rel="canonical" href="https://recipe-ideas.food" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Recipe Ideas",
              "url": "https://recipe-ideas.food",
              "description": "Discover amazing AI-generated recipes for every occasion and dietary preference.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://recipe-ideas.food/recipes?search={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Recipes */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Recipes
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover our most popular and highly-rated recipes, carefully curated for food enthusiasts.
              </p>
            </div>
            <FeaturedRecipes />
            <div className="text-center mt-8">
              <Link
                to="/recipes"
                className="inline-flex items-center space-x-2 btn-primary"
              >
                <span>View All Recipes</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find exactly what you're looking for with our comprehensive filtering system.
              </p>
            </div>
            <CategoryFilters />
          </div>
        </section>

        {/* Seasonal Recipes */}
        <section className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Seasonal Inspiration
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Fresh, seasonal ingredients make the best meals. Discover recipes perfect for this time of year.
              </p>
            </div>
            <SeasonalRecipes />
          </div>
        </section>

        {/* Newsletter Signup */}
        <NewsletterSignup />

        {/* CTA Section */}
        <section className="py-16 bg-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Cooking?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of food enthusiasts who are already discovering amazing recipes every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/recipes"
                className="btn bg-white text-primary-600 hover:bg-gray-100"
              >
                Explore Recipes
              </Link>
              <Link
                to="/about"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default HomePage 