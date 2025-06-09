"use client";

import StoryCard from "./components/StoryCard";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

type Story = {
  book_id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  rating: number;
  reviews: number;
};
export default function Home() {
  const [query, setQuery] = useState("");
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const { data } = await supabase
        .from("trending_books")
        .select("*")
        .limit(12);
      setStories((data as Story[]) || []);
    };

    fetchTrending();
  }, []);
  
  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <main className="min-h-screen p-6">
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

