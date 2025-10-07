"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import ShoppingCart from "@/components/ShoppingCart";
import SearchAndFilter from "@/components/SearchAndFilter";
import { useCart } from "@/hooks/useCart";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { calculateDiscountedPrice } from "@/utils/helpers";
import Header from "@/components/Header";

export default function Home() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartItemCount,
  } = useCart();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState<"price" | "rating" | "title">("title");

  // Get unique genres for filter
  const genres = useMemo(() => {
    const uniqueGenres = [...new Set(PRODUCTS.map((p) => p.genre))];
    return ["All", ...uniqueGenres.sort()];
  }, []);

  // Filter products based on search and genre
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre =
        selectedGenre === "All" || product.genre === selectedGenre;

      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "price":
          return (
            calculateDiscountedPrice(a.price, a.discount) -
            calculateDiscountedPrice(b.price, b.discount)
          );
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  return (
    <div className="min-h-screen w-full bg-gray-50 ">
      {/* Header */}
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 !mx-4 w-full px-4 sm:px-6 lg:px-10 py-8 ">
        {/* Search and Filter Bar */}
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          genres={genres}
        />

        {/* Results Count */}
        <h3 className="text-gray-600 !my-4 !mx-4">
          Showing {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "book" : "books"}
        </h3>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={setSelectedProduct}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No books found matching your criteria
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
              }}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}

      {/* Shopping Cart */}
      {isCartOpen && (
        <ShoppingCart
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          cartTotal={cartTotal}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}
