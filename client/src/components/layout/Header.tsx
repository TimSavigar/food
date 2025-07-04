import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Modal } from '../ui/Modal';

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: 'Recipes', path: '/recipes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin', path: '/admin' },
  ];

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
        <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
          {navLinks.map(link => (
            <Link key={link.name} to={link.path} className="text-white text-lg font-medium hover:text-orange-400 transition-colors duration-200">
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="text-white hover:text-orange-400 transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <Modal isOpen={mobileOpen} onClose={() => setMobileOpen(false)} className="p-0 bg-transparent shadow-none" aria-label="Mobile menu">
        <div className="bg-black rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-xl font-bold">Menu</span>
            <button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="text-white hover:text-orange-400">
              <X className="h-6 w-6" />
            </button>
          </div>
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block text-white text-lg font-medium hover:text-orange-400"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </Modal>
      
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