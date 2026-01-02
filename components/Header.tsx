"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from "react-icons/fi";
import Cart from "./Cart";
import { getCartItemCount } from "@/data/cart";
import { getFavoritesCount } from "@/data/favorites";

const announcements = [
  "Spend Rs. 1700 & get FREE delivery 🚚",
  "Dinner solved in 15 minutes — order today",
  "Fresh. Pre-Portioned. Zero Stress.",
  "Your kitchen, but smarter.",
  "Limited-time offers on best-selling meal kits",
];

const navigation = [
  { name: "HOME", href: "/" },
  { name: "ABOUT US", href: "/about" },
  { name: "SHOP ALL", href: "/shop" },
  { name: "SUBSCRIPTIONS", href: "/subscriptions" },
  { name: "BUILD YOUR OWN", href: "/build-your-own" },
  { name: "COMBOS", href: "/combos" },
  { name: "COOKING GUIDE", href: "/cooking-guide" },
  { name: "CONTACT US", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartItemCount());
    setFavoritesCount(getFavoritesCount());
  }, [cartOpen]);

  // Update counts when window regains focus (in case of cross-tab updates)
  useEffect(() => {
    const handleFocus = () => {
      setCartCount(getCartItemCount());
      setFavoritesCount(getFavoritesCount());
    };
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  // Rotating announcements
  useEffect(() => {
    const interval = setInterval(() => {
      const textElement = document.getElementById("announcement-text");
      if (textElement) {
        const currentIndex = announcements.indexOf(textElement.textContent || "");
        const nextIndex = (currentIndex + 1) % announcements.length;
        textElement.textContent = announcements[nextIndex];
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Listen for favorites and cart updates
  useEffect(() => {
    const handleFavoritesUpdate = () => {
      setFavoritesCount(getFavoritesCount());
    };
    const handleCartUpdate = () => {
      setCartCount(getCartItemCount());
    };

    window.addEventListener("favoritesUpdated", handleFavoritesUpdate);
    window.addEventListener("cartUpdated", handleCartUpdate);
    
    return () => {
      window.removeEventListener("favoritesUpdated", handleFavoritesUpdate);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Announcement Bar - Rotating */}
        <div className="bg-black text-white text-center py-2 text-sm">
          <p id="announcement-text">Spend Rs. 1700 & get FREE delivery 🚚</p>
        </div>

        {/* Main Header - Munchelis Style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo - Left */}
            <Link href="/" className="flex-shrink-0">
              <img
                src="/images/Logo.jpeg"
                alt="PrepBox"
                className="h-14 sm:h-16 lg:h-20 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-600 font-medium text-xs xl:text-sm uppercase tracking-wide transition-colors whitespace-nowrap"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700"
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 lg:space-x-3">
              <Link
                href="/favorites"
                className="p-2 text-gray-700 hover:text-primary-600 transition-colors relative"
                aria-label="Favorites"
              >
                <FiHeart className="h-5 w-5 lg:h-6 lg:w-6" />
                {favoritesCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center text-[10px] lg:text-xs">
                    {favoritesCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setCartOpen(true)}
                className="p-2 text-gray-700 hover:text-primary-600 transition-colors relative"
                aria-label="Shopping Cart"
              >
                <FiShoppingCart className="h-5 w-5 lg:h-6 lg:w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-primary-600 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center text-[10px] lg:text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                href="/account"
                className="hidden lg:block p-2 text-gray-700 hover:text-primary-600 transition-colors"
                aria-label="Account"
              >
                <FiUser className="h-5 w-5 lg:h-6 lg:w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-gray-700 hover:text-primary-600 font-medium text-sm uppercase"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

