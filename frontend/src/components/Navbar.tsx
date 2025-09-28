
import React from 'react';
import type { View } from '../../types';
import { NAV_ITEMS } from '../constants';
import Icon from './Icon';

interface NavbarProps {
  activeView: View;
  setActiveView: (view: View) => void;
  cartItemCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView, cartItemCount }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around max-w-2xl mx-auto">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`flex flex-col items-center justify-center w-full py-2 text-sm transition-colors duration-200 ${
              activeView === item.id ? 'text-red-700' : 'text-gray-500 hover:text-red-600'
            }`}
          >
            <div className="relative">
              <Icon>{item.icon}</Icon>
              {item.id === 'cart' && cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </div>
            <span className={`mt-1 font-medium ${activeView === item.id ? 'font-bold' : ''}`}>{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
