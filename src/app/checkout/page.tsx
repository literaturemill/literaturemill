"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";
  const priceParam = searchParams.get("price") || "0";
  const price = parseFloat(priceParam);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Checkout</h1>
        <div className="border-t border-gray-700 pt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>{title}</span>
            <span>${price.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${price.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 rounded-md py-2 transition-colors disabled:opacity-50"
        >
          {loading ? "Redirecting..." : "Confirm Purchase"}
        </button>
      </div>
    </div>
  );
}
