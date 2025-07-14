import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import kadjineLogo from '../assets/images/kadjine.jpg';

const Header = () => {
  const { getTotalItems } = useCart();

  return (
    <header className="glass-dark rounded-2xl shadow-xl">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex mx-2 items-center text-2xl font-bold text-white hover:text-indigo-300 transition-colors duration-300">
            <img
              src={kadjineLogo}
              alt="Kadjine Logo"
              className="h-14 w-14 rounded-xl object-cover mr-3 border-2 border-indigo-400/50 shadow-lg hover-glow"
            />
            <span className="ml-1 text-indigo-300">
              Kadjine Coffee
            </span>
          </Link>
          
          <nav className="flex items-center space-x-4 mx-2">
            <Link 
              to="/" 
              className="px-6 py-3 rounded-xl glass text-white hover:glass-card transition-all duration-300 font-medium shadow-lg hover-glow"
            >
              Menu
            </Link>
            
            <Link 
              to="/cart" 
              className="relative flex items-center px-6 py-3 rounded-xl glass text-white hover:glass-card transition-all duration-300 font-medium shadow-lg hover-glow"
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center shadow-lg animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
