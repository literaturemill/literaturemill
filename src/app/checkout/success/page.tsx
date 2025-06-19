"use client";
import { useEffect, useState } from "react";

export default function CheckoutSuccess() {
  const [item, setItem] = useState<{ title: string; image_url: string } | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("checkoutItem");
    if (raw) setItem(JSON.parse(raw));
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-green-400">Payment Successful</h1>
        <p className="text-foreground">Thank you for your purchase.</p>
        {item && (
          <a
            href={item.image_url}
            download
            className="block text-indigo-400 underline"
          >
            Download {item.title}
          </a>
        )}
        <p className="text-sm text-gray-400">An email receipt has been sent to your account.</p>
        <a href="/" className="text-indigo-400 hover:underline">
          Return Home
        </a>
      </div>
    </div>
  );
}