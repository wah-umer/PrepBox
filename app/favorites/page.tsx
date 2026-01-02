"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { getFavorites } from "@/data/favorites";
import { getProductById } from "@/data/products";
import { addToCart } from "@/data/cart";
import { toggleFavorite } from "@/data/favorites";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(getFavorites());
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const favs = getFavorites();
    setFavorites(favs);
    const states: { [key: number]: boolean } = {};
    favs.forEach((fav) => {
      states[fav.productId] = true;
    });
    setFavoriteStates(states);
  }, []);

  const handleRemoveFavorite = (productId: number) => {
    toggleFavorite(productId);
    setFavorites(getFavorites());
    setFavoriteStates((prev) => ({
      ...prev,
      [productId]: false,
    }));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const handleAddToCart = (productId: number, productName: string) => {
    addToCart(productId, 1);
    alert(`${productName} added to cart!`);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (favorites.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-black mb-8">My Favorites</h1>
          <div className="text-center py-12">
            <FiHeart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600 text-lg mb-4">No favorites yet</p>
            <Link
              href="/shop"
              className="text-primary-600 hover:underline font-semibold"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">My Favorites</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((favorite) => {
            const product = getProductById(favorite.productId);
            if (!product) return null;
            return (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-sm text-primary-600 font-medium mb-1">
                    {product.category}
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-black whitespace-nowrap">
                      Rs. {product.price.toFixed(0)}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRemoveFavorite(product.id)}
                        className="p-2 text-primary-600 hover:text-primary-700 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <FiHeart className="h-5 w-5 fill-current" />
                      </button>
                      <button
                        onClick={() => handleAddToCart(product.id, product.name)}
                        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
                        aria-label="Add to cart"
                      >
                        <FiShoppingCart className="h-5 w-5" />
                        <span className="hidden sm:inline">Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

