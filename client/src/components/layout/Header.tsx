import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-black sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Wavy white text logo */}
        <Link to="/" className="select-none">
          <span className="text-3xl font-bold text-white wavy-text tracking-wide" style={{ fontFamily: 'Poppins, Montserrat, sans-serif' }}>
            Recipe Ideas
          </span>
        </Link>
        {/* Minimal nav (add more links as needed) */}
        <nav className="space-x-6">
          <Link to="/recipes" className="text-white text-lg font-medium hover:text-orange-400 transition-colors">Recipes</Link>
          <Link to="/about" className="text-white text-lg font-medium hover:text-orange-400 transition-colors">About</Link>
          <Link to="/contact" className="text-white text-lg font-medium hover:text-orange-400 transition-colors">Contact</Link>
        </nav>
      </div>
      {/* Wavy text effect */}
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
    </header>
  );
};

export default Header; 