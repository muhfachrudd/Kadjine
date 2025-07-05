import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
import kadjineLogo from '../assets/images/kadjine.jpg';

const Header = () => {
  const { getTotalItems } = useCart();

  // Import logo image

  return (
    <header className="bg-black/20 rounded-2xl backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex mx-2 items-center text-2xl font-bold text-[#0A400C]">
            <img
              src={kadjineLogo}
              alt="Kadjine Logo"
              className="h-14 w-14 rounded-xl object-cover mr-2 border-2 border-[#819067] shadow-sm"
            />
            <span className="ml-1 text-[#0A400C]">Kadjine Coffee</span>
          </Link>
          
          <nav className="flex items-center space-x-4 mx-2">
            <Link 
              to="/" 
              className="px-4 py-2 rounded-lg bg-[#FEFAE0] text-[#0A400C] hover:bg-[#FEFAE0]/30 transition-colors font-medium shadow"
            >
              Menu
            </Link>
            
            <Link 
              to="/cart" 
              className="relative flex items-center px-4 py-2 rounded-lg bg-[#FEFAE0] text-[#0A400C] hover:bg-[#FEFAE0]/30 transition-colors font-medium shadow"
            >
              <ShoppingCartIcon className="h-6 w-6 mr-1" />
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#0A400C] text-[#FEFAE0] text-xs rounded-full h-5 w-5 flex items-center justify-center">
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
