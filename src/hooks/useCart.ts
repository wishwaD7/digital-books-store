"use client";

import { useState, useEffect, useMemo } from "react";
import { Product, CartItem, UseCartReturn } from "@/types";
import { calculateDiscountedPrice } from "@/utils/helpers";

const CART_STORAGE_KEY = "digital-books-cart";

export const useCart = (): UseCartReturn => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Initialize cart from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
    }
    setIsInitialized(true);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (error) {
        console.error("Error saving cart to localStorage:", error);
      }
    }
  }, [cart, isInitialized]);

  /**
   * Add item to cart or increment quantity if already exists
   */
  const addToCart = (product: Product): void => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * Remove item from cart
   */
  const removeFromCart = (productId: string): void => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Update item quantity
   */
  const updateQuantity = (productId: string, quantity: number): void => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Clear entire cart
   */
  const clearCart = (): void => {
    setCart([]);
  };

  // Calculate cart total (memoized for performance)
  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const discountedPrice = calculateDiscountedPrice(
        item.price,
        item.discount
      );
      return total + discountedPrice * item.quantity;
    }, 0);
  }, [cart]);

  // Calculate total item count
  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    isInitialized,
  };
};
