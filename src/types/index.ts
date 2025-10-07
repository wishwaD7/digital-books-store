/**
 * Product interface representing a digital book
 */
export interface Product {
  id: string;
  title: string;
  author: string;
  price: number;
  discount: number; // 0-1 representing percentage
  genre: string;
  description: string;
  coverImage: string;
  format: "EPUB" | "PDF" | "MOBI";
  rating: number;
  pages: number;
  language: string;
  releaseDate: string; // ISO date string
}

/**
 * Cart item interface extending Product with quantity
 */
export interface CartItem extends Product {
  quantity: number;
}

/**
 * Cart operations interface
 */
export interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  isInitialized: boolean;
}
