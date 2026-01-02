"use client";

import { useState, useEffect } from "react";
import { FiX, FiShoppingCart, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import Link from "next/link";
import { getCart, removeFromCart, updateCartItem, clearCart } from "@/data/cart";
import { getProductById } from "@/data/products";

// Helper to get custom product from localStorage
function getCustomProduct(productId: number) {
  if (typeof window === "undefined") return null;
  const customProducts = JSON.parse(localStorage.getItem("customProducts") || "{}");
  return customProducts[productId] || null;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const [cart, setCart] = useState(getCart());
  const [total, setTotal] = useState(0);

  const getProduct = (productId: number) => {
    // Check for custom product first
    const customProduct = getCustomProduct(productId);
    if (customProduct) return customProduct;
    // Fall back to regular product
    return getProductById(productId);
  };

  useEffect(() => {
    if (isOpen) {
      const currentCart = getCart();
      setCart(currentCart);
      const cartTotal = currentCart.items.reduce((sum, item) => {
        const product = getProduct(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
      setTotal(cartTotal);
    }
  }, [isOpen]);

  const handleRemove = (productId: number) => {
    // Remove custom product from localStorage if it exists
    const customProduct = getCustomProduct(productId);
    if (customProduct && typeof window !== "undefined") {
      const customProducts = JSON.parse(localStorage.getItem("customProducts") || "{}");
      delete customProducts[productId];
      localStorage.setItem("customProducts", JSON.stringify(customProducts));
    }
    
    removeFromCart(productId);
    const updatedCart = getCart();
    setCart(updatedCart);
    const cartTotal = updatedCart.items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    setTotal(cartTotal);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    updateCartItem(productId, quantity);
    const updatedCart = getCart();
    setCart(updatedCart);
    const cartTotal = updatedCart.items.reduce((sum, item) => {
      const product = getProduct(item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    setTotal(cartTotal);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 p-4 overflow-y-auto">
            {cart.items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <FiShoppingCart className="h-16 w-16 mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-center">
                  Start adding items to your cart to see them here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={item.productId}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Rs. {product.price.toFixed(0)}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                item.quantity - 1
                              )
                            }
                            className="p-1 border border-gray-300 rounded hover:bg-gray-200"
                          >
                            <FiMinus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                            className="p-1 border border-gray-300 rounded hover:bg-gray-200"
                          >
                            <FiPlus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                        <p className="font-semibold text-black">
                          Rs. {(product.price * item.quantity).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4 space-y-4 bg-white">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>Rs. {total.toFixed(0)}</span>
            </div>
            {cart.items.length > 0 && (
              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Checkout
              </Link>
            )}
            <Link
              href="/shop"
              onClick={onClose}
              className="block w-full text-center py-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

