'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type StoryCardProps = {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  rating: number;         // new
  reviews: number;        // new
};

export default function StoryCard({
  title,
  description,
  price,
  imageUrl,
  rating,
  reviews,
}: StoryCardProps) {
  const [showPreview, setShowPreview] = useState(false);
  const router = useRouter();

  return (
    <>
    <div className="bg-black rounded-lg shadow-md p-4 flex flex-col">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-white-600 text-sm mt-1">{description}</p>

      <button
        onClick={() => setShowPreview(true)}
        className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
        Preview
        </button>

      {/* Rating + Reviews */}
      <div className="flex items-center mt-2 text-sm text-yellow-500">
        {"★".repeat(Math.round(rating))}
        <span className="ml-2 text-gray-200 text-sm">({reviews} reviews)</span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-white-600 font-bold">{price}</span>
        <button
          onClick={() => router.push("/checkout")}
          className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
          Buy Now
        </button>

      </div>
    </div>

    {showPreview && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center z-50">
    <div className="bg-zinc-900 text-white p-6 rounded-xl shadow-2xl w-full max-w-md relative">
      <button
        onClick={() => setShowPreview(false)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 focus:outline-none focus:ring focus:ring-red-500 rounded-full text-xl"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-56 object-cover rounded-md mb-4"
      />
      <p className="text-gray-300 text-sm mb-2">{description}</p>
      <div className="flex items-center text-yellow-400 mb-2">
        {'★'.repeat(Math.round(rating))}
        <span className="ml-2 text-gray-200 text-sm">({reviews} reviews)</span>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="text-indigo-400 font-semibold">${price}</span>
        <button className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
          Buy Now
        </button>
      </div>
    </div>
  </div>
      )} 
      </>
  );
}

