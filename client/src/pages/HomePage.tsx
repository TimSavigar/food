import React, { useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/recipes?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Food Photography */}
      <section className="relative h-screen bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-6 max-w-4xl">
            <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
              Recipe Ideas
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Cook with creativity and joy
            </p>
            
            {/* Category Icons */}
            <div className="flex justify-center items-center space-x-12 mb-16">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto border border-white/30">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Meal of the day</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto border border-white/30">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Vegetarian</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto border border-white/30">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">Seasonal</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 mx-auto border border-white/30">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium">World Cuisine</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes..."
                className="w-full px-6 py-4 text-lg border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-8 bg-black text-white rounded-r-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Featured Recipe Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Meal of the Day */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-80 bg-cover bg-center" style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Meal of the day</h3>
                      <p className="text-orange-100">Try our daily suggested dish</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vegetarian */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-80 bg-cover bg-center" style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Vegetarian</h3>
                      <p className="text-green-100">Healthy and delicious meatless options</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seasonal */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-80 bg-cover bg-center" style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Seasonal</h3>
                      <p className="text-amber-100">Recipes inspired by the seasons</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* World Cuisine */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="h-80 bg-cover bg-center" style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}>
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">World Cuisine</h3>
                      <p className="text-purple-100">Recipes from around the globe</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Cuisine Flags Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore Global Flavors</h2>
            <p className="text-gray-600 text-lg">Discover authentic recipes from around the world</p>
          </div>
          
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            {/* Italian */}
            <Link to="/recipes?cuisine=italian" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-gradient-to-r from-green-500 via-white to-red-500 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">IT</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Italian</p>
            </Link>
            
            {/* American */}
            <Link to="/recipes?cuisine=american" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-gradient-to-b from-red-500 via-white to-blue-500 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">US</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">American</p>
            </Link>
            
            {/* Japanese */}
            <Link to="/recipes?cuisine=japanese" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-white rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200 flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Japanese</p>
            </Link>
            
            {/* German */}
            <Link to="/recipes?cuisine=german" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-gradient-to-b from-black via-red-500 to-yellow-400 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-white">DE</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">German</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Start Cooking?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of home cooks who discover new recipes every day
          </p>
          <Link
            to="/recipes"
            className="inline-block bg-orange-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg hover:shadow-xl"
          >
            Explore All Recipes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 