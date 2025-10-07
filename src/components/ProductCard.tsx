"use client";

import { Star } from "lucide-react";
import { calculateDiscountedPrice, formatCurrency } from "@/utils/helpers";
import { Product } from "@/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
}) => {
  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );
  const hasDiscount = product.discount > 0;

  // console.log("product", product);

  return (
    <div className="bg-white p-2 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      {/* Product Image */}
      <div className="relative h-64 bg-gray-200 overflow-hidden">
        <Image
          src={product.coverImage}
          alt={product.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {hasDiscount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold z-10">
            {Math.round(product.discount * 100)}% OFF
          </div>
        )}
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs z-10">
          {product.format}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {product.genre}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
          {product.title}
        </h3>

        <p className="text-sm text-gray-600 mb-2">by {product.author}</p>

        <div className="flex items-center mb-3">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-700">
            {product.rating}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            ({product.pages} pages)
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-baseline mb-3">
            <span className="text-2xl font-bold text-gray-900">
              {formatCurrency(discountedPrice)}
            </span>
            {hasDiscount && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="flex-1 bg-gray-100 text-gray-800 m-2 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Details
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="flex-1 bg-blue-600 text-white m-2 py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
