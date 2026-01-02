"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheck, FiArrowRight, FiCalendar, FiDollarSign, FiPackage, FiX } from "react-icons/fi";
import {
  subscriptionPlans,
  SubscriptionPlan,
  SubscriptionFrequency,
  createSubscription,
  getSubscriptionById,
  updateSubscriptionItems,
  getPlanById,
} from "@/data/subscriptions";
import { products } from "@/data/products";
import { combos } from "@/data/combos";
import { useRouter } from "next/navigation";

const benefits = [
  {
    icon: <FiCalendar className="h-6 w-6" />,
    title: "Weekly or monthly plans",
    description: "Choose the frequency that works best for you",
  },
  {
    icon: <FiDollarSign className="h-6 w-6" />,
    title: "Better value than one-time orders",
    description: "Save up to 15% on every delivery",
  },
  {
    icon: <FiPackage className="h-6 w-6" />,
    title: "Flexible meal selection",
    description: "Change your meals anytime",
  },
  {
    icon: <FiX className="h-6 w-6" />,
    title: "Skip, pause, or cancel anytime",
    description: "Full control over your subscription",
  },
];

export default function SubscriptionsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<{ [key: number]: number }>({});
  const [showMealSelection, setShowMealSelection] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const allProducts = [...products, ...combos];

  // Load subscription data if editing
  useEffect(() => {
    if (editId) {
      const subscription = getSubscriptionById(editId);
      if (subscription) {
        setIsEditing(true);
        const plan = getPlanById(subscription.planId);
        if (plan) {
          setSelectedPlan(plan);
          setShowMealSelection(true);
          
          // Pre-populate meals
          const meals: { [key: number]: number } = {};
          subscription.items.forEach((item) => {
            meals[item.productId] = item.quantity;
          });
          setSelectedMeals(meals);
        }
      }
    }
  }, [editId]);

  const handlePlanSelect = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setShowMealSelection(true);
  };

  const handleMealQuantityChange = (productId: number, change: number) => {
    setSelectedMeals((prev) => {
      const current = prev[productId] || 0;
      const newQuantity = Math.max(0, current + change);
      if (newQuantity === 0) {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      }
      return { ...prev, [productId]: newQuantity };
    });
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.entries(selectedMeals).forEach(([productId, quantity]) => {
      const product = allProducts.find((p) => p.id === parseInt(productId));
      if (product) {
        total += product.price * quantity;
      }
    });
    return total;
  };

  const getDiscountedPrice = () => {
    if (!selectedPlan) return 0;
    const total = getTotalPrice();
    return total * (1 - selectedPlan.discount / 100);
  };

  const getSavings = () => {
    return getTotalPrice() - getDiscountedPrice();
  };

  const handleSubscribe = () => {
    if (!selectedPlan || Object.keys(selectedMeals).length === 0) {
      alert("Please select a plan and at least one meal");
      return;
    }

    const items = Object.entries(selectedMeals).map(([productId, quantity]) => ({
      productId: parseInt(productId),
      quantity,
    }));

    try {
      if (isEditing && editId) {
        // Update existing subscription
        if (updateSubscriptionItems(editId, items)) {
          window.dispatchEvent(new Event("subscriptionsUpdated"));
          router.push("/subscriptions/manage");
        } else {
          alert("Failed to update subscription. Please try again.");
        }
      } else {
        // Create new subscription
        const subscription = createSubscription(
          selectedPlan.id,
          items,
          selectedPlan.frequency
        );
        
        // Dispatch event to update other components
        window.dispatchEvent(new Event("subscriptionsUpdated"));
        
        // Redirect to manage page
        router.push("/subscriptions/manage");
      }
    } catch (error) {
      alert(`Failed to ${isEditing ? "update" : "create"} subscription. Please try again.`);
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            PrepBox Subscriptions
          </h1>
          <p className="text-2xl text-gray-600 mb-2">
            Cooking just got easier — and consistent.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            With PrepBox subscriptions, your ready-to-cook meal kits are delivered weekly or monthly, so you never have to worry about planning, shopping, or last-minute food stress again.
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto mt-4">
            Choose your meals, pick your plan, and enjoy fresh, pre-portioned ingredients delivered straight to your doorstep — on schedule, on time.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Subscribe?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <div className="flex justify-center mb-4 text-primary-600">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subscription Plans */}
        {!showMealSelection ? (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`bg-white rounded-lg shadow-lg p-8 relative ${
                    plan.popular ? "ring-2 ring-primary-600" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {plan.discount}% OFF
                    </div>
                    <p className="text-sm text-gray-500">{plan.savings}</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center text-gray-700">
                      <FiCheck className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                      <span>Fresh ingredients delivered</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FiCheck className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                      <span>Flexible meal selection</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FiCheck className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                      <span>Skip or pause anytime</span>
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FiCheck className="h-5 w-5 text-primary-600 mr-2 flex-shrink-0" />
                      <span>Cancel anytime</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => handlePlanSelect(plan)}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <span>Select Plan</span>
                    <FiArrowRight className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      Selected Plan: {selectedPlan?.name}
                    </h2>
                    <p className="text-gray-600">{selectedPlan?.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      if (isEditing) {
                        router.push("/subscriptions/manage");
                      } else {
                        setShowMealSelection(false);
                        setSelectedPlan(null);
                        setSelectedMeals({});
                      }
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {isEditing ? "Cancel" : "Change Plan"}
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                {isEditing ? "Update Your Meals" : "Choose Your Meals"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {allProducts.map((product) => {
                  const quantity = selectedMeals[product.id] || 0;
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-contain bg-gray-100"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {product.name}
                        </h4>
                        <p className="text-primary-600 font-bold mb-3">
                          Rs. {product.price.toFixed(0)}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleMealQuantityChange(product.id, -1)
                              }
                              disabled={quantity === 0}
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <FiX className="h-4 w-4" />
                            </button>
                            <span className="font-semibold min-w-[30px] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleMealQuantityChange(product.id, 1)
                              }
                              className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              <FiCheck className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {Object.keys(selectedMeals).length > 0 && (
                <div className="bg-white rounded-lg shadow-md p-6 sticky bottom-0">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="text-gray-900 font-semibold">
                      Rs. {getTotalPrice().toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700">
                      Discount ({selectedPlan?.discount}%):
                    </span>
                    <span className="text-green-600 font-semibold">
                      -Rs. {getSavings().toFixed(0)}
                    </span>
                  </div>
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-gray-900">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-primary-600">
                        Rs. {getDiscountedPrice().toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleSubscribe}
                    className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                  >
                    {isEditing ? "Update Subscription" : "Start Subscription"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-primary-600 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Fresh meals. Less effort. Zero stress.
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of happy customers who never worry about dinner again.
          </p>
          {!showMealSelection && (
            <Link
              href="/shop"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Browse All Meals
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

