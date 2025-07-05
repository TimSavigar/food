import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/recipes?search=${encodeURIComponent(searchTerm)}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with integrated search and categories */}
      <section className="relative bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
      }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-white px-4 py-20">
          
          {/* Title and Subtitle */}
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-wide">
              Recipe Ideas
            </h1>
            <p className="text-xl md:text-2xl font-light mb-12">
              Cook with creativity and joy
            </p>
            
            {/* Category Icons Row */}
            <div className="flex justify-center items-center space-x-12 mb-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Meal of the day</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Vegetarian</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                </div>
                <p className="text-sm font-medium">Seasonal</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-3 border border-white/20">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <p className="text-sm font-medium">World Cuisine</p>
              </div>
            </div>
          </div>

          {/* Search Bar - Integrated into hero */}
          <div className="max-w-2xl mx-auto mb-16">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search recipes..."
                  className="w-full px-6 py-4 text-lg text-gray-900 bg-white/90 backdrop-blur-sm rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white shadow-lg"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 h-12 px-8 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Recipe Categories Grid - In the same dark section */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Meal of the Day Card */}
              <div className="group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                  <div className="h-48 bg-cover bg-center relative" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                  }}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">Meal of the day</h3>
                    <p className="text-white/70 text-sm">Try our daily suggested dish</p>
                  </div>
                </div>
              </div>

              {/* Vegetarian Card */}
              <div className="group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                  <div className="h-48 bg-cover bg-center relative" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                  }}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">Vegetarian</h3>
                    <p className="text-white/70 text-sm">Healthy and delicious meatless options</p>
                  </div>
                </div>
              </div>

              {/* Seasonal Card */}
              <div className="group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                  <div className="h-48 bg-cover bg-center relative" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                  }}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">Seasonal</h3>
                    <p className="text-white/70 text-sm">Recipes inspired by the seasons</p>
                  </div>
                </div>
              </div>

              {/* World Cuisine Card */}
              <div className="group cursor-pointer">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-1 border border-white/20">
                  <div className="h-48 bg-cover bg-center relative" style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                  }}>
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-2">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1">World Cuisine</h3>
                    <p className="text-white/70 text-sm">Recipes from around the globe</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Recipe Grid - Light background */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Recipe Card 1 */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-cover bg-center" style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Pancakes</h3>
                  <p className="text-gray-600 text-sm">Fluffy breakfast pancakes</p>
                </div>
              </div>
            </div>

            {/* Recipe Card 2 */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-cover bg-center" style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551782450-a2132b4ba21d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Pasta</h3>
                  <p className="text-gray-600 text-sm">Classic Italian pasta dish</p>
                </div>
              </div>
            </div>

            {/* Recipe Card 3 */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-cover bg-center" style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Salad</h3>
                  <p className="text-gray-600 text-sm">Fresh garden salad</p>
                </div>
              </div>
            </div>

            {/* Recipe Card 4 */}
            <div className="group cursor-pointer">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="h-48 bg-cover bg-center" style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80')`
                }}></div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Pizza</h3>
                  <p className="text-gray-600 text-sm">Homemade pizza recipe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Cuisine Flags */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
            <Link to="/recipes?cuisine=italian" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-gradient-to-r from-green-500 via-white to-red-500 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200"></div>
              <p className="text-sm text-gray-600 mt-2">Italian</p>
            </Link>
            
            <Link to="/recipes?cuisine=american" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-gradient-to-b from-red-500 via-white to-blue-500 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200"></div>
              <p className="text-sm text-gray-600 mt-2">American</p>
            </Link>
            
            <Link to="/recipes?cuisine=japanese" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-white rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200 flex items-center justify-center">
                <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Japanese</p>
            </Link>
            
            <Link to="/recipes?cuisine=german" className="group flex flex-col items-center">
              <div className="w-16 h-12 bg-gradient-to-b from-black via-red-500 to-yellow-400 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300 border-2 border-gray-200"></div>
              <p className="text-sm text-gray-600 mt-2">German</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 