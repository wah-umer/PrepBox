"use client";

import { useState } from "react";
import { FiShoppingCart, FiPlus, FiMinus } from "react-icons/fi";
import { addToCart } from "@/data/cart";
import Link from "next/link";

interface Ingredient {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface PortionSize {
  name: string;
  multiplier: number;
  description: string;
}

const baseDishes = [
  { id: "pasta", name: "Pasta", basePrice: 1500, description: "Choose your pasta base" },
  { id: "rice", name: "Rice Bowl", basePrice: 1600, description: "Choose your rice base" },
  { id: "chicken", name: "Chicken", basePrice: 1800, description: "Choose your chicken base" },
  { id: "vegetarian", name: "Vegetarian", basePrice: 1400, description: "Choose your vegetarian base" },
];

const ingredients: Ingredient[] = [
  // Proteins
  { id: "chicken-breast", name: "Chicken Breast", price: 500, category: "Protein" },
  { id: "chicken-thigh", name: "Chicken Thigh", price: 450, category: "Protein" },
  { id: "beef", name: "Beef", price: 600, category: "Protein" },
  { id: "shrimp", name: "Shrimp", price: 700, category: "Protein" },
  { id: "tofu", name: "Tofu", price: 300, category: "Protein" },
  
  // Vegetables
  { id: "bell-peppers", name: "Bell Peppers", price: 150, category: "Vegetables" },
  { id: "broccoli", name: "Broccoli", price: 200, category: "Vegetables" },
  { id: "mushrooms", name: "Mushrooms", price: 180, category: "Vegetables" },
  { id: "spinach", name: "Spinach", price: 120, category: "Vegetables" },
  { id: "tomatoes", name: "Tomatoes", price: 100, category: "Vegetables" },
  { id: "onions", name: "Onions", price: 80, category: "Vegetables" },
  
  // Sauces & Spices
  { id: "alfredo-sauce", name: "Alfredo Sauce", price: 200, category: "Sauces" },
  { id: "marinara-sauce", name: "Marinara Sauce", price: 180, category: "Sauces" },
  { id: "curry-sauce", name: "Curry Sauce", price: 220, category: "Sauces" },
  { id: "peri-peri", name: "Peri Peri Sauce", price: 200, category: "Sauces" },
  { id: "garlic-herbs", name: "Garlic & Herbs", price: 150, category: "Sauces" },
  
  // Extras
  { id: "cheese", name: "Cheese", price: 250, category: "Extras" },
  { id: "nuts", name: "Nuts", price: 300, category: "Extras" },
  { id: "olives", name: "Olives", price: 200, category: "Extras" },
  { id: "bread", name: "Bread", price: 150, category: "Extras" },
];

const portionSizes: PortionSize[] = [
  { name: "Single", multiplier: 1, description: "1 serving" },
  { name: "Double", multiplier: 1.8, description: "2 servings" },
  { name: "Family", multiplier: 2.5, description: "3-4 servings" },
];

export default function BuildYourOwnPage() {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedPortion, setSelectedPortion] = useState<PortionSize>(portionSizes[0]);
  const [specialRequests, setSpecialRequests] = useState("");

  const getBasePrice = () => {
    if (!selectedBase) return 0;
    const base = baseDishes.find((d) => d.id === selectedBase);
    return base ? base.basePrice : 0;
  };

  const getIngredientsPrice = () => {
    return selectedIngredients.reduce((total, ingId) => {
      const ingredient = ingredients.find((ing) => ing.id === ingId);
      return total + (ingredient ? ingredient.price : 0);
    }, 0);
  };

  const calculateTotal = () => {
    const basePrice = getBasePrice();
    const ingredientsPrice = getIngredientsPrice();
    const subtotal = (basePrice + ingredientsPrice) * selectedPortion.multiplier;
    return Math.round(subtotal);
  };

  const toggleIngredient = (ingredientId: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId]
    );
  };

  const handleAddToCart = () => {
    if (!selectedBase) {
      alert("Please select a base dish first!");
      return;
    }

    const base = baseDishes.find((d) => d.id === selectedBase);
    const selectedIngredientNames = selectedIngredients
      .map((id) => ingredients.find((ing) => ing.id === id)?.name)
      .filter(Boolean);

    // Create a custom product ID (using a high number to avoid conflicts with regular products)
    const customProductId = 10000 + Math.floor(Math.random() * 10000);

    // Add to cart with the custom product ID
    addToCart(customProductId, 1);
    
    // Store custom product details in localStorage for cart display
    const customProduct = {
      id: customProductId,
      name: `Custom ${base?.name} - ${selectedPortion.name}`,
      price: calculateTotal(),
      description: `Custom meal kit with: ${selectedIngredientNames.join(", ") || "base only"}${specialRequests ? `. Special requests: ${specialRequests}` : ""}`,
      image: "/images/Moroccan Chicken.jpeg", // Default image
      category: "Custom",
      ingredients: selectedIngredientNames,
      cookingTime: "30-45 minutes",
      servings: selectedPortion.description,
      stock: 999, // Unlimited for custom orders
    };

    // Store in localStorage for cart retrieval
    const customProducts = JSON.parse(localStorage.getItem("customProducts") || "{}");
    customProducts[customProductId] = customProduct;
    localStorage.setItem("customProducts", JSON.stringify(customProducts));

    alert(`Your custom meal kit has been added to cart! Price: Rs. ${calculateTotal()}`);
    window.dispatchEvent(new Event("cartUpdated"));

    // Clear all selections
    setSelectedBase(null);
    setSelectedIngredients([]);
    setSelectedPortion(portionSizes[0]);
    setSpecialRequests("");
  };

  const ingredientsByCategory = ingredients.reduce((acc, ing) => {
    if (!acc[ing.category]) {
      acc[ing.category] = [];
    }
    acc[ing.category].push(ing);
    return acc;
  }, {} as Record<string, Ingredient[]>);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Build Your Own PrepBox
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your dish, portion size, and extras — made exactly how you like it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Selection */}
          <div className="lg:col-span-2 space-y-8">
            {/* Base Dish Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-4">1. Select Your Base</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {baseDishes.map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => setSelectedBase(dish.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedBase === dish.id
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{dish.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{dish.description}</p>
                    <p className="text-primary-600 font-bold">Rs. {dish.basePrice}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Portion Size */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-4">2. Choose Portion Size</h2>
              <div className="grid grid-cols-3 gap-4">
                {portionSizes.map((portion) => (
                  <button
                    key={portion.name}
                    onClick={() => setSelectedPortion(portion)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPortion.name === portion.name
                        ? "border-primary-600 bg-primary-50"
                        : "border-gray-300 hover:border-primary-300"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{portion.name}</h3>
                    <p className="text-sm text-gray-600">{portion.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingredients Selection */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-4">3. Add Ingredients & Extras</h2>
              {Object.entries(ingredientsByCategory).map(([category, categoryIngredients]) => (
                <div key={category} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{category}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categoryIngredients.map((ingredient) => (
                      <button
                        key={ingredient.id}
                        onClick={() => toggleIngredient(ingredient.id)}
                        className={`p-3 rounded-lg border-2 transition-all text-left ${
                          selectedIngredients.includes(ingredient.id)
                            ? "border-primary-600 bg-primary-50"
                            : "border-gray-300 hover:border-primary-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">{ingredient.name}</span>
                          <span className="text-primary-600 font-semibold text-sm">
                            +Rs. {ingredient.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Special Requests */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-black mb-4">4. Special Requests (Optional)</h2>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special instructions or dietary requirements..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                rows={4}
              />
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-black mb-6">Your PrepBox</h2>

              {selectedBase ? (
                <>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600">Base</p>
                      <p className="font-semibold text-gray-900">
                        {baseDishes.find((d) => d.id === selectedBase)?.name}
                      </p>
                      <p className="text-sm text-primary-600">
                        Rs. {getBasePrice()} × {selectedPortion.multiplier} = Rs.{" "}
                        {Math.round(getBasePrice() * selectedPortion.multiplier)}
                      </p>
                    </div>

                    {selectedIngredients.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Ingredients</p>
                        <div className="space-y-1">
                          {selectedIngredients.map((ingId) => {
                            const ing = ingredients.find((i) => i.id === ingId);
                            return ing ? (
                              <div key={ingId} className="flex justify-between text-sm">
                                <span className="text-gray-700">{ing.name}</span>
                                <span className="text-primary-600">
                                  Rs. {Math.round(ing.price * selectedPortion.multiplier)}
                                </span>
                              </div>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-600">Portion</p>
                      <p className="font-semibold text-gray-900">{selectedPortion.name}</p>
                    </div>
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-black">Total</span>
                      <span className="text-2xl font-bold text-primary-600">
                        Rs. {calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-primary-600 text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <FiShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">Select a base dish to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

