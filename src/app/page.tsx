"use client";

import StoryCard from "./components/StoryCard";
import { useState } from "react";

const stories = [
  {
    title: "Moonlight Memories",
    description: "A poetic journey through dreams and time.",
    price: "$4.99",
    imageUrl: "https://placekitten.com/400/250",
    rating: 5,
    reviews: 23,
  },
  {
    title: "Lost in Lavender",
    description: "An artist's tale set in a fantasy realm.",
    price: "$7.99",
    imageUrl: "https://placekitten.com/401/250",
    rating: 4,
    reviews: 16,
  },
  {
    title: "The Last Sketch",
    description: "Mystery unfolds through every pencil stroke.",
    price: "$5.99",
    imageUrl: "https://placekitten.com/402/250",
    rating: 4,
    reviews: 9,
  },
];

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <main className="min-h-screen bg-gray-800 p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Featured Works
        </h1>
        <input
          type="text"
          placeholder="Search stories/books..."
          onChange={(e) => setQuery(e.target.value)}
          className="mb-6 w-full max-w-md p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition duration-150 ease-in-out"/>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
          <StoryCard key={index} {...story} />
          ))}
        </div>
      </main>
    </>
  );
}

