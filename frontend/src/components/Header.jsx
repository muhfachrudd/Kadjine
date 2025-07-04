import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import kadjineLogo from '../assets/images/kadjine.jpg';

const Header = () => {
  const { getTotalItems } = useCart();

  // Import logo image

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center text-2xl font-bold text-gray-800">
            <img
              src={kadjineLogo}
              alt="Kadjine Logo"
              className="h-14 w-14 rounded-xl object-cover mr-2 border-2 border-gray-300 shadow-sm"
            />
            <span className="ml-1">Kadjine Coffee</span>
          </Link>
          
          <nav className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Menu
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-1" />
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
