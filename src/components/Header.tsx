"use client";

import { ShoppingCart, BookOpen } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="bg-white !w-full shadow-md top-0 z-40  ">
      <div className="!w-full mx-auto px-4 sm:px-6 lg:px-10 ">
        <div className="flex items-center justify-between h-16 !mx-4">
          {/* Logo */}
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="ml-2 text-xl sm:text-2xl font-bold text-gray-900">
              Digital Books
            </h1>
          </div>

          {/* Cart Button */}
          <button
            onClick={onCartClick}
            className="relative bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            aria-label="Open shopping cart"
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
