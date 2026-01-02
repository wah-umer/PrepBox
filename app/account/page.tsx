"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FiPackage, FiArrowRight, FiCalendar } from "react-icons/fi";
import { getActiveSubscriptions, getSubscriptions } from "@/data/subscriptions";
import { getPlanById } from "@/data/subscriptions";

export default function AccountPage() {
  const [activeSubscriptions, setActiveSubscriptions] = useState(
    getActiveSubscriptions()
  );
  const [allSubscriptions, setAllSubscriptions] = useState(getSubscriptions());

  const refreshSubscriptions = () => {
    setActiveSubscriptions(getActiveSubscriptions());
    setAllSubscriptions(getSubscriptions());
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

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/subscriptions"
                  className="block w-full bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Start Subscription
                </Link>
                <Link
                  href="/subscriptions/manage"
                  className="block w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  Manage Subscriptions
                </Link>
                <Link
                  href="/shop"
                  className="block w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors text-center"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Subscriptions */}
            {activeSubscriptions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Active Subscriptions
                  </h2>
                  <Link
                    href="/subscriptions/manage"
                    className="text-primary-600 hover:text-primary-700 font-semibold flex items-center space-x-1"
                  >
                    <span>Manage All</span>
                    <FiArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {activeSubscriptions.slice(0, 3).map((subscription) => {
                    const plan = getPlanById(subscription.planId);
                    return (
                      <div
                        key={subscription.id}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <FiPackage className="h-5 w-5 text-primary-600" />
                              <h3 className="font-semibold text-gray-900">
                                {plan?.name || "Subscription"}
                              </h3>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                ACTIVE
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {plan?.description || "Meal kit subscription"}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-gray-700">
                              <FiCalendar className="h-4 w-4" />
                              <span>
                                Next delivery:{" "}
                                {formatDate(subscription.nextDeliveryDate)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <FiPackage className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  No Active Subscriptions
                </h2>
                <p className="text-gray-600 mb-6">
                  Start a subscription to get fresh meal kits delivered
                  regularly and save on every order.
                </p>
                <Link
                  href="/subscriptions"
                  className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Browse Subscription Plans
                </Link>
              </div>
            )}

            {/* Account Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Account Information
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900">Sign in to view your email</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Orders</p>
                  <p className="text-gray-900">
                    {allSubscriptions.length} subscription
                    {allSubscriptions.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

