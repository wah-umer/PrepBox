"use client";

import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What exactly is PrepBox?",
    answer:
      "PrepBox is a ready-to-cook meal kit service. We deliver fresh, pre-portioned ingredients with easy recipe cards so you can cook a home-style meal in 10–15 minutes, without planning or prep.",
  },
  {
    question: "How is PrepBox different from takeout or frozen food?",
    answer:
      "Unlike takeout, PrepBox is fresh, not cooked or frozen. You get raw, prepped ingredients — no preservatives, no reheating — just real cooking made faster.",
  },
  {
    question: "How fresh are the ingredients?",
    answer:
      "All ingredients are freshly sourced, portioned the same day, and airtight sealed to lock in freshness until cooking.",
  },
  {
    question: "Do I need cooking skills to use PrepBox?",
    answer:
      "Not at all. Each box includes simple step-by-step recipe cards designed for beginners and busy people.",
  },
  {
    question: "How long does it take to cook a meal?",
    answer: "Most PrepBox meals take 10–15 minutes from start to finish.",
  },
  {
    question: "Is PrepBox healthy?",
    answer:
      "Yes. Our meals are portion-controlled, balanced, and free from artificial preservatives. We also offer diet-friendly and keto options.",
  },
  {
    question: "Do you offer customizable meal kits?",
    answer:
      "Yes. You can customize your meal by choosing the dish, quantity, and add-ons, or request specific preferences.",
  },
  {
    question: "What areas do you deliver to?",
    answer:
      "We currently deliver across Karachi, with a focus on areas like Clifton, DHA, PECHS, and surrounding neighborhoods.",
  },
  {
    question: "How does delivery work?",
    answer:
      "We partner with reliable delivery services to ensure safe and timely delivery. All boxes are securely packed for transit.",
  },
  {
    question: "Do you offer subscriptions?",
    answer:
      "Yes. We offer weekly and monthly subscription plans for maximum convenience and better value.",
  },
  {
    question: "Can I order a single meal box without a subscription?",
    answer: "Absolutely. You can place one-time orders anytime.",
  },
  {
    question: "What if I have feedback or an issue with my order?",
    answer:
      "Our support team is available via WhatsApp, DMs, and calls. We actively use customer feedback to improve and customize our offerings.",
  },
  {
    question: "How do I pay?",
    answer:
      "We support online payments and cash-on-delivery options (where applicable).",
  },
  {
    question: "Is there a minimum order value?",
    answer:
      "Minimum order values may apply during promotions. Any applicable details are shown at checkout.",
  },
  {
    question: "Can I see the recipes before ordering?",
    answer:
      "Yes. You can browse our recipe cards on the website to explore dishes and cooking steps before ordering.",
  },
  {
    question: "Is PrepBox suitable for families?",
    answer:
      "Yes. We offer family-friendly portions and combo deals designed for shared meals.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 text-lg">
            Still have questions? Reach out - we're happy to help
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <FiChevronUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
                ) : (
                  <FiChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 pt-0">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-black mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-700 mb-6">
            Reach out - we're happy to help
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

