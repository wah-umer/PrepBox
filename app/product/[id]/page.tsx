"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FiShoppingCart, FiHeart, FiMinus, FiPlus } from "react-icons/fi";
import Link from "next/link";
import { getProductById } from "@/data/products";
import { addToCart, getCart, updateCartItem, removeFromCart } from "@/data/cart";
import { toggleFavorite, isFavorite } from "@/data/favorites";

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = getProductById(productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.image || "");
  const [isFavorited, setIsFavorited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (product) {
      setIsFavorited(isFavorite(product.id));
      const cart = getCart();
      const cartItem = cart.items.find((item) => item.productId === product.id);
      setIsInCart(!!cartItem);
      setCartQuantity(cartItem ? cartItem.quantity : 0);
      if (cartItem) {
        setQuantity(cartItem.quantity);
      }
    }
  }, [product]);

  // Listen for cart updates from other components
  useEffect(() => {
    const handleCartUpdate = () => {
      if (product) {
        const cart = getCart();
        const cartItem = cart.items.find((item) => item.productId === product.id);
        setIsInCart(!!cartItem);
        setCartQuantity(cartItem ? cartItem.quantity : 0);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [product]);

  const handleFavoriteClick = () => {
    if (product) {
      toggleFavorite(product.id);
      setIsFavorited(!isFavorited);
      window.dispatchEvent(new Event("favoritesUpdated"));
    }
  };

  const handleAddToCart = () => {
    if (product) {
      // Check if quantity exceeds stock
      if (quantity > product.stock) {
        return;
      }
      addToCart(product.id, quantity);
      setIsInCart(true);
      setCartQuantity(quantity);
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const handleQuantityChange = (change: number) => {
    if (product) {
      const newQuantity = quantity + change;
      
      // Prevent going below 1 (minimum quantity)
      if (newQuantity < 1) {
        return;
      }
      
      // Prevent exceeding stock
      if (newQuantity > product.stock) {
        return;
      }
      
      setQuantity(newQuantity);
      if (isInCart) {
        updateCartItem(product.id, newQuantity);
        setCartQuantity(newQuantity);
        window.dispatchEvent(new Event("cartUpdated"));
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-primary-600 hover:underline">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-600">
            Home
          </Link>
          {" / "}
          <Link href="/shop" className="hover:text-primary-600">
            Shop
          </Link>
          {" / "}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden mb-4 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full max-h-96 object-contain"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-primary-600 font-medium mb-2">
              {product.category}
            </p>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-black whitespace-nowrap">
                Rs. {product.price.toFixed(0)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  Rs. {product.originalPrice.toFixed(0)}
                </span>
              )}
            </div>

            {/* Stock Display */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">In Stock:</span> {product.stock} units
              </p>
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <FiMinus className="h-5 w-5" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <FiPlus className="h-5 w-5" />
                </button>
              </div>
              {quantity >= product.stock && (
                <p className="text-sm text-red-600 mt-2">Maximum stock reached</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 mb-8">
              {isInCart && (
                <div className="flex items-center justify-center space-x-2 border border-gray-300 rounded-lg px-2 py-1 max-w-[120px]">
                  <button
                    onClick={() => {
                      const newQty = cartQuantity - 1;
                      if (newQty >= 0 && newQty <= product.stock) {
                        if (newQty === 0) {
                          removeFromCart(product.id);
                          setIsInCart(false);
                          setCartQuantity(0);
                        } else {
                          updateCartItem(product.id, newQty);
                          setCartQuantity(newQty);
                          setQuantity(newQty);
                        }
                        window.dispatchEvent(new Event("cartUpdated"));
                      }
                    }}
                    disabled={cartQuantity <= 0}
                    className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <FiMinus className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-semibold min-w-[20px] text-center">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={() => {
                      const newQty = cartQuantity + 1;
                      if (newQty <= product.stock) {
                        updateCartItem(product.id, newQty);
                        setCartQuantity(newQty);
                        setQuantity(newQty);
                        window.dispatchEvent(new Event("cartUpdated"));
                      }
                    }}
                    disabled={cartQuantity >= product.stock}
                    className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <FiPlus className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 whitespace-nowrap ${
                    isInCart
                      ? "bg-green-600 text-white hover:bg-green-700"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  <FiShoppingCart className="h-5 w-5" />
                  <span>{isInCart ? "In Cart" : "Add to Cart"}</span>
                </button>
                <button
                  onClick={handleFavoriteClick}
                  className={`px-8 py-4 border-2 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    isFavorited
                      ? "border-primary-600 bg-primary-50 text-primary-600 hover:bg-primary-100"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <FiHeart
                    className={`h-5 w-5 ${isFavorited ? "fill-current" : ""}`}
                  />
                  <span>{isFavorited ? "Favorited" : "Save for Later"}</span>
                </button>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t pt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Ingredients
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {product.ingredients.map((ingredient: string, idx: number) => (
                    <li key={idx}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Cooking Time
                  </h3>
                  <p className="text-gray-700">{product.cookingTime}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Servings
                  </h3>
                  <p className="text-gray-700">{product.servings}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

