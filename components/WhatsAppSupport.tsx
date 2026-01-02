"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppSupport() {
  const handleClick = () => {
    // Replace with your WhatsApp number (format: country code + number without +)
    const phoneNumber = "923001234567"; // Example: Pakistan number
    const message = encodeURIComponent("Hello! I need help with PrepBox.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed right-6 bottom-6 z-50 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#20BA5A] transition-colors duration-300 flex items-center space-x-2 group"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="h-6 w-6" />
      <span className="font-semibold whitespace-nowrap">Customer Support</span>
    </button>
  );
}

