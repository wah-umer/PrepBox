"use client";

import { useState } from "react";

const reviews = [
  {
    name: "Mr. Aqib Saleem",
    rating: 5,
    text: "Main usually kitchen ke qareeb bhi nahi jata, lekin PrepBox ne literally mujhe cooking try karwa di. Sab kuch pehle se portioned tha, recipe card itna simple ke confusion ka sawal hi nahi. Grocery ka jhanjhat bhi khatam. Honestly, agar mujhe kitchen jana hai, to sirf PrepBox ke saath.",
  },
  {
    name: "Ali Raza",
    rating: 4.5,
    text: "Honestly, bohot convenient hai. Ingredients bilkul fresh thay aur cooking ka time bhi kaafi kam ho gaya. First time try kiya tha but will definitely order again. Perfect for working people.",
  },
  {
    name: "Hamna Siddiqui",
    rating: 4,
    text: "PrepBox ne cooking ka scene easy bana diya hai. Planning aur prep ka tension khatam. Thora sa time lagta hai cook karne mein but taste totally worth it.",
  },
  {
    name: "Ayesha Malik",
    rating: 5,
    text: "The concept is really smart. Everything comes prepped so cooking doesn't feel overwhelming.",
  },
];

export default function Reviews() {
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-black mb-4">
            What Our Customers Are Saying
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredReview(idx)}
              onMouseLeave={() => setHoveredReview(null)}
              className={`bg-gray-50 p-6 rounded-lg border border-gray-200 transition-all duration-300 cursor-pointer ${
                hoveredReview === idx
                  ? "shadow-xl scale-105 border-primary-300 bg-white z-10"
                  : "hover:shadow-lg"
              }`}
            >
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < Math.floor(review.rating)
                        ? "text-primary-600"
                        : i < review.rating
                        ? "text-primary-300"
                        : "text-gray-300"
                    }`}
                  >
                    ⭐
                  </span>
                ))}
                {review.rating % 1 !== 0 && (
                  <span className="text-xl text-primary-300">½</span>
                )}
              </div>
              <p
                className={`text-gray-700 mb-4 italic transition-all duration-300 ${
                  hoveredReview === idx
                    ? "text-base leading-relaxed"
                    : "text-sm line-clamp-3"
                }`}
              >
                "{review.text}"
              </p>
              <p className="font-semibold text-black">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

