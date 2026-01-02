"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiCalendar,
  FiPackage,
  FiPause,
  FiPlay,
  FiX,
  FiEdit,
  FiTrash2,
  FiCheck,
} from "react-icons/fi";
import {
  getSubscriptions,
  getActiveSubscriptions,
  pauseSubscription,
  resumeSubscription,
  cancelSubscription,
  skipDelivery,
  unskipDelivery,
  getPlanById,
  Subscription,
} from "@/data/subscriptions";
import { products } from "@/data/products";
import { combos } from "@/data/combos";

export default function ManageSubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[]>([]);

  const refreshSubscriptions = () => {
    const allSubs = getSubscriptions();
    const active = getActiveSubscriptions();
    setSubscriptions(allSubs);
    setActiveSubscriptions(active);
  };

  useEffect(() => {
    refreshSubscriptions();

    // Listen for subscription updates
    const handleUpdate = () => {
      refreshSubscriptions();
    };

    window.addEventListener("subscriptionsUpdated", handleUpdate);
    return () => {
      window.removeEventListener("subscriptionsUpdated", handleUpdate);
    };
  }, []);

  const allProducts = [...products, ...combos];

  const getProductName = (productId: number): string => {
    const product = allProducts.find((p) => p.id === productId);
    return product?.name || `Product #${productId}`;
  };

  const getProductPrice = (productId: number): number => {
    const product = allProducts.find((p) => p.id === productId);
    return product?.price || 0;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePause = (id: string) => {
    if (pauseSubscription(id)) {
      refreshSubscriptions();
      window.dispatchEvent(new Event("subscriptionsUpdated"));
    }
  };

  const handleResume = (id: string) => {
    if (resumeSubscription(id)) {
      refreshSubscriptions();
      window.dispatchEvent(new Event("subscriptionsUpdated"));
    }
  };

  const handleCancel = (id: string) => {
    if (confirm("Are you sure you want to cancel this subscription?")) {
      if (cancelSubscription(id)) {
        refreshSubscriptions();
        window.dispatchEvent(new Event("subscriptionsUpdated"));
      }
    }
  };

  const handleSkip = (id: string, deliveryDate: string) => {
    if (skipDelivery(id, deliveryDate)) {
      refreshSubscriptions();
      window.dispatchEvent(new Event("subscriptionsUpdated"));
    }
  };

  const handleUnskip = (id: string, deliveryDate: string) => {
    if (unskipDelivery(id, deliveryDate)) {
      refreshSubscriptions();
      window.dispatchEvent(new Event("subscriptionsUpdated"));
    }
  };

  const calculateTotal = (subscription: Subscription): number => {
    let total = 0;
    subscription.items.forEach((item) => {
      const price = getProductPrice(item.productId);
      total += price * item.quantity;
    });
    const plan = getPlanById(subscription.planId);
    if (plan) {
      total = total * (1 - plan.discount / 100);
    }
    return total;
  };

  if (subscriptions.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            Manage Subscriptions
          </h1>
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FiPackage className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No Active Subscriptions
            </h2>
            <p className="text-gray-600 mb-6">
              You don't have any subscriptions yet. Start a subscription to get
              fresh meal kits delivered regularly.
            </p>
            <Link
              href="/subscriptions"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Browse Subscription Plans
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Manage Subscriptions
          </h1>
          <Link
            href="/subscriptions"
            className="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            + New Subscription
          </Link>
        </div>

        <div className="space-y-6">
          {subscriptions.map((subscription) => {
            const plan = getPlanById(subscription.planId);
            const isActive = subscription.status === "active";
            const isPaused = subscription.status === "paused";
            const isCancelled = subscription.status === "cancelled";

            return (
              <div
                key={subscription.id}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {plan?.name || "Subscription"}
                      </h2>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          isActive
                            ? "bg-green-100 text-green-800"
                            : isPaused
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {subscription.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {plan?.description || "Meal kit subscription"}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">
                      Rs. {calculateTotal(subscription).toFixed(0)}
                    </div>
                    <div className="text-sm text-gray-500">
                      per delivery
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Selected Meals:
                  </h3>
                  <div className="space-y-2">
                    {subscription.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-700">
                          {getProductName(item.productId)} × {item.quantity}
                        </span>
                        <span className="text-gray-600">
                          Rs.{" "}
                          {(
                            getProductPrice(item.productId) * item.quantity
                          ).toFixed(0)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex items-center space-x-2 text-gray-700 mb-2">
                    <FiCalendar className="h-5 w-5" />
                    <span className="font-semibold">Next Delivery:</span>
                    <span>{formatDate(subscription.nextDeliveryDate)}</span>
                  </div>
                  {subscription.pausedUntil && (
                    <div className="text-sm text-yellow-600 ml-7">
                      Paused until: {formatDate(subscription.pausedUntil)}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">
                  {isActive && (
                    <>
                      <button
                        onClick={() => handlePause(subscription.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg hover:bg-yellow-200 transition-colors"
                      >
                        <FiPause className="h-4 w-4" />
                        <span>Pause</span>
                      </button>
                      <button
                        onClick={() =>
                          handleSkip(
                            subscription.id,
                            subscription.nextDeliveryDate
                          )
                        }
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <FiX className="h-4 w-4" />
                        <span>Skip Next Delivery</span>
                      </button>
                    </>
                  )}
                  {isPaused && (
                    <button
                      onClick={() => handleResume(subscription.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <FiPlay className="h-4 w-4" />
                      <span>Resume</span>
                    </button>
                  )}
                  {!isCancelled && (
                    <button
                      onClick={() => handleCancel(subscription.id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <FiTrash2 className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  )}
                  <Link
                    href={`/subscriptions?edit=${subscription.id}`}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-100 text-primary-800 rounded-lg hover:bg-primary-200 transition-colors"
                  >
                    <FiEdit className="h-4 w-4" />
                    <span>Edit Meals</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

