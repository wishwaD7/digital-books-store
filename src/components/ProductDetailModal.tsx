"use client";

import { X, Star, BookOpen, Calendar, Globe, FileText } from "lucide-react";
import {
  calculateDiscountedPrice,
  formatCurrency,
  formatDate,
} from "@/utils/helpers";
import { Product } from "@/types";
import Image from "next/image";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const discountedPrice = calculateDiscountedPrice(
    product.price,
    product.discount
  );
  const hasDiscount = product.discount > 0;

  return (
    <div
      className="fixed m-2 inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full my-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="grid md:grid-cols-2 gap-6 p-6">
            {/* Left Column - Image */}
            <div className="relative h-96">
              <Image
                src={product.coverImage}
                alt={product.title}
                fill
                className="rounded-lg shadow-md object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-md font-bold z-10">
                  {Math.round(product.discount * 100)}% OFF
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="flex flex-col">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded">
                  {product.genre}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>

              <p className="text-lg text-gray-600 mb-4">by {product.author}</p>

              <div className="flex items-center mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-2 text-lg font-medium text-gray-700">
                  {product.rating} / 5.0
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Book Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Format</p>
                    <p className="font-medium">{product.format}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Pages</p>
                    <p className="font-medium">{product.pages}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Language</p>
                    <p className="font-medium">{product.language}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-600 mr-2 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Released</p>
                    <p className="font-medium text-sm">
                      {formatDate(product.releaseDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price and Purchase */}
              <div className="mt-auto">
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatCurrency(discountedPrice)}
                  </span>
                  {hasDiscount && (
                    <span className="ml-3 text-lg text-gray-500 line-through">
                      {formatCurrency(product.price)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-md hover:shadow-lg"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
