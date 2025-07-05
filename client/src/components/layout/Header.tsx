import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black/90 backdrop-blur-sm sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="select-none">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-white tracking-wide">
              Recipe Ideas
            </span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">
            Home
          </Link>
          <Link to="/recipes" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">
            Recipes
          </Link>
          <Link to="/about" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">
            About
          </Link>
          <Link to="/contact" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-orange-400 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-sm">
          <nav className="px-6 py-4 space-y-2">
            <Link 
              to="/" 
              className="block text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/recipes" 
              className="block text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Recipes
            </Link>
            <Link 
              to="/about" 
              className="block text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="block text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; 