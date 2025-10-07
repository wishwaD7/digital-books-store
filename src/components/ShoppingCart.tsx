"use client";

import { X, Plus, Minus, ShoppingCart as CartIcon } from "lucide-react";
import { calculateDiscountedPrice, formatCurrency } from "@/utils/helpers";
import { CartItem } from "@/types";
import Image from "next/image";

interface ShoppingCartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  cartTotal: number;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  cartTotal,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center md:p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full md:max-w-2xl md:rounded-lg shadow-2xl max-h-screen md:max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <CartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-2">
                Add some books to get started!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => {
                const discountedPrice = calculateDiscountedPrice(
                  item.price,
                  item.discount
                );
                const itemTotal = discountedPrice * item.quantity;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-20 h-28 flex-shrink-0">
                      <Image
                        src={item.coverImage}
                        alt={item.title}
                        fill
                        className="object-cover rounded shadow-sm"
                        sizes="80px"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.author}
                      </p>
                      <p className="text-sm font-medium text-blue-600">
                        {formatCurrency(discountedPrice)} each
                      </p>
                    </div>

                    {/* Quantity Controls & Price */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-2 bg-white rounded-lg border">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="font-bold text-gray-900">
                        {formatCurrency(itemTotal)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer with Total */}
        {cart.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-medium text-gray-700">Total:</span>
              <span className="text-3xl font-bold text-gray-900">
                {formatCurrency(cartTotal)}
              </span>
            </div>
            <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;
