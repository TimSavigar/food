import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryFilters from '../components/home/CategoryFilters';
import FeaturedRecipes from '../components/home/FeaturedRecipes';
import SeasonalRecipes from '../components/home/SeasonalRecipes';
import NewsletterSignup from '../components/home/NewsletterSignup';
import SEOOptimizer from '../components/seo/SEOOptimizer';
import PerformanceOptimizer from '../components/seo/PerformanceOptimizer';

// (All recipe-of-the-day logic moved to separate component or future enhancement.)

const HomePage: React.FC = () => {
  return (
    <PerformanceOptimizer>
      <SEOOptimizer
        title="Discover Amazing Recipes | Recipe Ideas"
        description="Explore thousands of delicious recipes generated with AI, perfect for any occasion."
        keywords={["recipes", "cooking", "food", "AI recipes"]}
      />

      <HeroSection />
      <CategoryFilters />
      <FeaturedRecipes />
      <SeasonalRecipes />
      <NewsletterSignup />
    </PerformanceOptimizer>
  );
};

export default HomePage; 