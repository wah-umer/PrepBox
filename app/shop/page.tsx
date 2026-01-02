"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FiShoppingCart, FiHeart, FiFilter, FiPlus, FiMinus } from "react-icons/fi";
import { products, getProductsByCategory } from "@/data/products";
import { categoryFilters } from "@/data/categories";
import { combos } from "@/data/combos";
import { addToCart, getCart, updateCartItem, removeFromCart } from "@/data/cart";
import { toggleFavorite, isFavorite } from "@/data/favorites";

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [activeSection, setActiveSection] = useState("classic");
  const [favoriteStates, setFavoriteStates] = useState<{ [key: number]: boolean }>({});
  const [cartStates, setCartStates] = useState<{ [key: number]: boolean }>({});
  const [cartQuantities, setCartQuantities] = useState<{ [key: number]: number }>({});

  // Get filtered products and deduplicate by ID
  const filteredProducts = useMemo(() => {
    let items: (typeof products[0] | typeof combos[0])[] = [];
    
    if (selectedCategory === "Combo") {
      items = combos;
    } else if (selectedCategory === "All") {
      items = [...getProductsByCategory(selectedCategory), ...combos];
    } else {
      items = getProductsByCategory(selectedCategory);
    }
    
    // Deduplicate by ID to prevent any duplicates
    const seen = new Set<number>();
    return items.filter((item) => {
      if (seen.has(item.id)) {
        return false;
      }
      seen.add(item.id);
      return true;
    });
  }, [selectedCategory]);

  useEffect(() => {
    // Initialize favorite and cart states
    const favStates: { [key: number]: boolean } = {};
    const cartItems = getCart();
    const cartStates: { [key: number]: boolean } = {};
    const quantities: { [key: number]: number } = {};
    
    // filteredProducts already includes combos when "All" is selected
    filteredProducts.forEach((item) => {
      favStates[item.id] = isFavorite(item.id);
      const cartItem = cartItems.items.find((cartItem) => cartItem.productId === item.id);
      cartStates[item.id] = !!cartItem;
      quantities[item.id] = cartItem ? cartItem.quantity : 0;
    });
    
    setFavoriteStates(favStates);
    setCartStates(cartStates);
    setCartQuantities(quantities);
  }, [filteredProducts]);

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      const cartItems = getCart();
      const quantities: { [key: number]: number } = {};
      const states: { [key: number]: boolean } = {};
      
      // filteredProducts already includes combos when "All" is selected
      filteredProducts.forEach((item) => {
        const cartItem = cartItems.items.find((cartItem) => cartItem.productId === item.id);
        states[item.id] = !!cartItem;
        quantities[item.id] = cartItem ? cartItem.quantity : 0;
      });
      
      setCartStates(states);
      setCartQuantities(quantities);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [filteredProducts]);

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

  const getCartQuantity = (productId: number): number => {
    return cartQuantities[productId] || 0;
  };

  const getProductStock = (productId: number): number => {
    const product = filteredProducts.find((p) => p.id === productId);
    if (product) return product.stock;
    // Also check combos if not found in filtered products
    const combo = combos.find((c) => c.id === productId);
    return combo ? combo.stock : 0;
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
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Your Dinner, Your Way
          </h1>
          <p className="text-gray-600 text-lg">
            Pick from curated classics, build your own box, or follow a diet plan that fits your goals.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSection("classic")}
              className={`pb-4 px-2 font-semibold border-b-2 transition-colors ${
                activeSection === "classic"
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Classic Meal Kits
            </button>
            <button
              onClick={() => setActiveSection("custom")}
              className={`pb-4 px-2 font-semibold border-b-2 transition-colors ${
                activeSection === "custom"
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Build Your Own
            </button>
            <button
              onClick={() => setActiveSection("keto")}
              className={`pb-4 px-2 font-semibold border-b-2 transition-colors ${
                activeSection === "keto"
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-gray-600 hover:text-black"
              }`}
            >
              Keto & Diet Plans
            </button>
          </div>
        </div>

        {/* Classic Meal Kits Section */}
        {activeSection === "classic" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                Classic Meal Kits
              </h2>
              <p className="text-gray-600">
                Our signature ready-to-cook meals — comforting, flavorful, and perfect for everyday dinners.
              </p>
            </div>

            {/* Filters */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {categoryFilters.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-primary-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiFilter className="h-5 w-5" />
                <span>Filters</span>
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                const isCombo = product.category === "Combo";
                return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={isCombo ? `/combos` : `/product/${product.id}`}>
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
                    <Link href={isCombo ? `/combos` : `/product/${product.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900 whitespace-nowrap">
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
                                {cartStates[product.id] ? "In Cart" : "Add"}
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Build Your Own Section */}
        {activeSection === "custom" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                Build Your Own PrepBox
              </h2>
              <p className="text-gray-600 mb-6">
                Choose your dish, portion size, and extras — made exactly how you like it.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600 mb-6">
                Select your preferred dish • Choose portion size • Add special requests • Customize ingredients • Add optional add-ons
              </p>
              <Link
                href="/build-your-own"
                className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Start Building Your Meal
              </Link>
            </div>
          </div>
        )}

        {/* Keto & Diet Plans Section */}
        {activeSection === "keto" && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-black mb-2">
                Keto & Diet Meal Kits
              </h2>
              <p className="text-gray-600">
                Designed for health goals without compromising on taste or convenience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-black mb-2">Keto-friendly meals</h3>
                <p className="text-gray-600">Low-carb, high-fat options</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-black mb-2">High-protein options</h3>
                <p className="text-gray-600">Perfect for fitness goals</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-black mb-2">Low-carb plans</h3>
                <p className="text-gray-600">Balanced nutrition</p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-black mb-2">Calorie-conscious kits</h3>
                <p className="text-gray-600">Portion-controlled meals</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Keto meal kits coming soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
