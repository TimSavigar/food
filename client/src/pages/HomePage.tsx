import React from 'react';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import CategoryFilters from '../components/home/CategoryFilters';
import SeasonalRecipes from '../components/home/SeasonalRecipes';
import NewsletterSignup from '../components/home/NewsletterSignup';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Modern Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center bg-black">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600&q=80"
          alt="Cooking inspiration"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div className="relative z-10 text-center px-4 py-24">
          <h1 className="text-5xl md:text-7xl font-bold text-white wavy-text mb-6 drop-shadow-lg" style={{ fontFamily: 'Montserrat, Poppins, sans-serif' }}>
            Cook with creativity and joy
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow">
            Discover, create, and share delicious recipes for every occasion. Powered by AI, inspired by you.
          </p>
          <a
            href="#featured"
            className="inline-block px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Explore Recipes
          </a>
        </div>
        <style>{`
          .wavy-text {
            display: inline-block;
            animation: wave 2.5s infinite linear;
          }
          @keyframes wave {
            0%, 100% { transform: skewX(-6deg); }
            10% { transform: skewX(6deg); }
            20% { transform: skewX(-6deg); }
            30% { transform: skewX(6deg); }
            40% { transform: skewX(-6deg); }
            50% { transform: skewX(6deg); }
            60% { transform: skewX(-6deg); }
            70% { transform: skewX(6deg); }
            80% { transform: skewX(-6deg); }
            90% { transform: skewX(6deg); }
          }
        `}</style>
      </section>

      <div id="featured">
        <FeaturedRecipes />
      </div>
      <CategoryFilters />
      <SeasonalRecipes />
      <NewsletterSignup />
    </>
  );
};

export default HomePage; 