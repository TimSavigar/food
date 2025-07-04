import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-black sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Wavy white text logo */}
        <Link to="/" className="select-none">
          <div className="flex items-center">
            <span className="text-3xl font-bold text-white wavy-text tracking-wide" style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}>
              Recipe-Ideas
            </span>
          </div>
        </Link>
        
        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/recipes" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">Recipes</Link>
          <Link to="/about" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">About</Link>
          <Link to="/contact" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">Contact</Link>
          <Link to="/admin" className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">Admin</Link>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button className="text-white hover:text-orange-400 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Enhanced wavy text effect */}
      <style>{`
        .wavy-text {
          display: inline-block;
          animation: wave 3s ease-in-out infinite;
          background: linear-gradient(45deg, #ffffff, #fbbf24, #ffffff);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes wave {
          0%, 100% { 
            transform: skewX(-3deg) scale(1);
            background-position: 0% 50%;
          }
          25% { 
            transform: skewX(3deg) scale(1.02);
            background-position: 100% 50%;
          }
          50% { 
            transform: skewX(-2deg) scale(1);
            background-position: 100% 50%;
          }
          75% { 
            transform: skewX(2deg) scale(1.02);
            background-position: 0% 50%;
          }
        }
      `}</style>
    </header>
  );
};

export default Header; 