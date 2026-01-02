"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { combos } from "@/data/combos";
import { addToCart, getCart, updateCartItem, removeFromCart } from "@/data/cart";
import { toggleFavorite, isFavorite } from "@/data/favorites";

export default function CombosPage() {
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});
  const [cartStates, setCartStates] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const favStates: { [key: number]: boolean } = {};
    const cartItems = getCart();
    const cartStates: { [key: number]: boolean } = {};
    
    combos.forEach((combo) => {
      favStates[combo.id] = isFavorite(combo.id);
      cartStates[combo.id] = cartItems.items.some((item) => item.productId === combo.id);
    });
    
    setFavoriteStates(favStates);
    setCartStates(cartStates);
  }, []);

  const handleFavoriteClick = (comboId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(comboId);
    setFavoriteStates((prev) => ({
      ...prev,
      [comboId]: !prev[comboId],
    }));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const getCartQuantity = (comboId: number): number => {
    const cart = getCart();
    const item = cart.items.find((item) => item.productId === comboId);
    return item ? item.quantity : 0;
  };

  const handleQuantityChange = (comboId: number, change: number) => {
    const currentQuantity = getCartQuantity(comboId);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity <= 0) {
      removeFromCart(comboId);
      setCartStates((prev) => ({
        ...prev,
        [comboId]: false,
      }));
    } else {
      if (currentQuantity === 0) {
        addToCart(comboId, 1);
        setCartStates((prev) => ({
          ...prev,
          [comboId]: true,
        }));
      } else {
        updateCartItem(comboId, newQuantity);
      }
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleAddToCart = (comboId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(comboId, 1);
    setCartStates((prev) => ({
      ...prev,
      [comboId]: true,
    }));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Combo Deals You'll Love
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            More Meals. More Value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative">
                <img
                  src={combo.image}
                  alt={combo.name}
                  className="w-full h-72 object-contain"
                />
                <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Save {combo.savings}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-2">
                  {combo.name}
                </h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  {combo.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-black whitespace-nowrap">
                      Rs. {combo.price.toFixed(0)}
                    </span>
                    <span className="text-lg text-gray-500 line-through ml-2">
                      Rs. {combo.originalPrice?.toFixed(0)}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleFavoriteClick(combo.id, e)}
                    className={`p-2 transition-colors ${
                      favoriteStates[combo.id]
                        ? "text-primary-600"
                        : "text-gray-600 hover:text-primary-600"
                    }`}
                    aria-label="Add to favorites"
                  >
                    <FiHeart
                      className={`h-5 w-5 ${
                        favoriteStates[combo.id] ? "fill-current" : ""
                      }`}
                    />
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
                  {cartStates[combo.id] && (
                    <div className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-2 py-1">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuantityChange(combo.id, -1);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-semibold min-w-[20px] text-center">
                        {getCartQuantity(combo.id)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleQuantityChange(combo.id, 1);
                        }}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={(e) => handleAddToCart(combo.id, e)}
                    className={`w-full text-white text-center py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 whitespace-nowrap ${
                      cartStates[combo.id]
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-primary-600 hover:bg-primary-700"
                    }`}
                  >
                    <FiShoppingCart className="h-5 w-5" />
                    <span>{cartStates[combo.id] ? "In Cart" : "Add to Cart"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

