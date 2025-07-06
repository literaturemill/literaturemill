'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type StoryCardProps = {
  title: string;
  description: string;
  price: string;
  image_url: string;
  upload_url?: string;
  content?: string | null;
  rating: number; // new
  reviews: number; // new
};

export default function StoryCard({
  title,
  description,
  price,
  image_url,
  upload_url,
  content,
  rating,
  reviews,
}: StoryCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handleAddToCart = () => {
    const raw = localStorage.getItem('cart');
    const cart = raw ? JSON.parse(raw) : [];
    cart.push({ title, price, image_url });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  };
  const router = useRouter();

  return (
    <>
    <div className="card rounded-lg shadow-md p-4 flex flex-col">
      <Image
        src={image_url}
        alt={title}
        width={600}
        height={192}
        unoptimized
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-sm mt-1 opacity-80">{description}</p>

      <button
        onClick={() => setShowPreview(true)}
        className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition">
        Preview
        </button>

      {/* Rating + Reviews */}
      <div className="flex items-center mt-2 text-sm text-yellow-500">
        {"★".repeat(Math.round(rating))}
        <span className="ml-2 text-sm opacity-80">({reviews} reviews)</span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-foreground font-bold">{price}</span>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="text-sm px-3 py-1 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Add to Cart
          </button>
          <button
            onClick={() => {
              localStorage.setItem('checkoutItem', JSON.stringify({ title, price, image_url }));
              router.push(
                `/checkout?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`
              );
            }}
            className="text-sm px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
          >
            Buy Now
            </button>
            {upload_url && (
            <a
              href={upload_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 underline"
            >
              View Uploaded Paper
            </a>
          )}
        </div>

      </div>
    </div>

    {showPreview && (
  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center z-50">
    <div className="card text-foreground p-6 rounded-xl shadow-2xl w-full max-w-md relative">
      <button
        onClick={() => setShowPreview(false)}
        className="absolute top-2 right-2 opacity-70 hover:text-red-500 focus:outline-none focus:ring focus:ring-red-500 rounded-full text-xl"
      >
        &times;
      </button>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <Image
        src={image_url}
        alt={title}
        width={600}
        height={224}
        unoptimized
        className="w-full h-56 object-cover rounded-md mb-4"
      />
            <p className="text-sm mb-2 opacity-80">{description}</p>
            {upload_url ? (
        <a
          href={upload_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 underline block mb-2"
        >
          View PDF
        </a>
      ) : (
        content && (
          <div
            className="prose dark:prose-invert text-sm mb-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )
      )}
      <div className="flex items-center text-yellow-400 mb-2">
        {'★'.repeat(Math.round(rating))}
        <span className="ml-2 text-sm opacity-80">({reviews} reviews)</span>
      </div>
      <div className="flex justify-between items-center mt-4">
          <span className="text-indigo-400 font-semibold">{price}</span>
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="text-sm px-3 py-1 border border-indigo-500 text-indigo-500 rounded hover:bg-indigo-600 hover:text-white transition"
          >
            Add to Cart
          </button>
          <button
            className="text-sm px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            onClick={() => {
              localStorage.setItem('checkoutItem', JSON.stringify({ title, price, image_url }));
              router.push(
                `/checkout?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`
              );
            }}
          >
            Buy Now
                </button>
                
        </div>
      </div>
    </div>
  </div>
      )} 
      </>
  );
}

