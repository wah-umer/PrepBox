"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const sliderImages = [
  "/images/slider-1.jpeg",
  "/images/slider-2.jpeg",
  "/images/slider-3.jpeg",
];

const sliderTexts = [
  "From fridge to plate in 15 minutes",
  "Perfect portions. Zero food waste.",
  "Healthy, comforting, and actually doable",
];

export default function Hero() {
  const [currentSlider, setCurrentSlider] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlider((prev) => (prev + 1) % sliderImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      {/* Background Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlider ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Slider ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="relative z-20 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Home-cooked meals, minus the hard part.
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Fresh, pre-portioned ingredients delivered to your door. 
              Thoughtfully designed meals that taste great and cook fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/shop"
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                Order Now
              </Link>
              <Link
                href="/shop"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                View Menu
              </Link>
            </div>
            {/* Slider Text */}
            <div className="mt-8 h-8">
              <p className="text-lg text-gray-200 animate-fade-in">
                {sliderTexts[currentSlider]}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlider(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlider
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

