"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart, FiPlus, FiMinus } from "react-icons/fi";
import { products } from "@/data/products";
import { addToCart, getCart, updateCartItem, removeFromCart } from "@/data/cart";
import { toggleFavorite, isFavorite, getFavoritesCount } from "@/data/favorites";

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});
  const [cartStates, setCartStates] = useState<{ [key: number]: boolean }>({});
  const [cartQuantities, setCartQuantities] = useState<{ [key: number]: number }>({});
  const featuredProducts = products.slice(0, 6);

  useEffect(() => {
    // Initialize favorite and cart states
    const favStates: { [key: number]: boolean } = {};
    const cartItems = getCart();
    const cartStates: { [key: number]: boolean } = {};
    const quantities: { [key: number]: number } = {};
    
    featuredProducts.forEach((product) => {
      favStates[product.id] = isFavorite(product.id);
      const cartItem = cartItems.items.find((item) => item.productId === product.id);
      cartStates[product.id] = !!cartItem;
      quantities[product.id] = cartItem ? cartItem.quantity : 0;
    });
    
    setFavoriteStates(favStates);
    setCartStates(cartStates);
    setCartQuantities(quantities);
  }, []);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      const cartItems = getCart();
      const quantities: { [key: number]: number } = {};
      const states: { [key: number]: boolean } = {};
      
      featuredProducts.forEach((product) => {
        const cartItem = cartItems.items.find((item) => item.productId === product.id);
        states[product.id] = !!cartItem;
        quantities[product.id] = cartItem ? cartItem.quantity : 0;
      });
      
      setCartStates(states);
      setCartQuantities(quantities);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const getCartQuantity = (productId: number): number => {
    return cartQuantities[productId] || 0;
  };

  const getProductStock = (productId: number): number => {
    const product = featuredProducts.find((p) => p.id === productId);
    return product ? product.stock : 0;
  };

  const handleQuantityChange = (productId: number, change: number) => {
    const currentQuantity = getCartQuantity(productId);
    const stock = getProductStock(productId);
    const newQuantity = currentQuantity + change;
    
    // Prevent going below 0
    if (newQuantity < 0) {
      return;
    }
    
    // Prevent exceeding stock
    if (newQuantity > stock) {
      return;
    }
    
    if (newQuantity === 0) {
      removeFromCart(productId);
      setCartStates((prev) => ({
        ...prev,
        [productId]: false,
      }));
      setCartQuantities((prev) => ({
        ...prev,
        [productId]: 0,
      }));
    } else {
      if (currentQuantity === 0) {
        addToCart(productId, 1);
        setCartStates((prev) => ({
          ...prev,
          [productId]: true,
        }));
        setCartQuantities((prev) => ({
          ...prev,
          [productId]: 1,
        }));
      } else {
        updateCartItem(productId, newQuantity);
        setCartQuantities((prev) => ({
          ...prev,
          [productId]: newQuantity,
        }));
      }
    }
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleFavoriteClick = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(productId);
    setFavoriteStates((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
    window.dispatchEvent(new Event("favoritesUpdated"));
  };

  const handleAddToCart = (productId: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const stock = getProductStock(productId);
    const currentQuantity = getCartQuantity(productId);
    
    // Check if we can add more
    if (currentQuantity >= stock) {
      return;
    }
    
    addToCart(productId, 1);
    setCartStates((prev) => ({
      ...prev,
      [productId]: true,
    }));
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            Most-Loved PrepBox Meals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            What Everyone's Cooking
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link href={`/product/${product.id}`}>
                <div className="aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-72 object-contain group-hover:scale-105 transition-transform duration-300"
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
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleFavoriteClick(product.id, e)}
                        className={`p-2 transition-colors ${
                          favoriteStates[product.id]
                            ? "text-primary-600"
                            : "text-gray-600 hover:text-primary-600"
                        }`}
                        aria-label="Add to favorites"
                      >
                        <FiHeart
                          className={`h-5 w-5 ${
                            favoriteStates[product.id] ? "fill-current" : ""
                          }`}
                        />
                      </button>
                      <div className="flex flex-col space-y-2 flex-1">
                      {cartStates[product.id] && (
                        <div className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-2 py-1">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleQuantityChange(product.id, -1);
                            }}
                            disabled={getCartQuantity(product.id) <= 0}
                            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <FiMinus className="h-4 w-4" />
                          </button>
                          <span className="text-sm font-semibold min-w-[20px] text-center">
                            {getCartQuantity(product.id)}
                          </span>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleQuantityChange(product.id, 1);
                            }}
                            disabled={getCartQuantity(product.id) >= product.stock}
                            className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Increase quantity"
                          >
                            <FiPlus className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                        <button
                          onClick={(e) => handleAddToCart(product.id, e)}
                          className={`px-4 py-2 rounded-lg transition-colors flex items-center justify-center space-x-2 whitespace-nowrap ${
                            cartStates[product.id]
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-primary-600 text-white hover:bg-primary-700"
                          }`}
                          aria-label="Add to cart"
                        >
                          <FiShoppingCart className="h-5 w-5" />
                          <span className="hidden sm:inline">
                            {cartStates[product.id] ? "In Cart" : "Add to Cart"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

