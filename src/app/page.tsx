"use client";

import StoryCard from "./components/StoryCard";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Image from "next/image";
import Link from "next/link";

type Story = {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  upload_url: string;
  content?: string | null;
  rating?: number;
  reviews?: number;
};
export default function Home() {
  const [query, setQuery] = useState("");
  const [stories, setStories] = useState<Story[]>([]);
  const [users, setUsers] = useState<{ id: string; username: string; avatar_url: string | null }[]>([]);

  useEffect(() => {
    const fetchRecent = async () => {
      const { data } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);
      setStories((data as Story[]) || []);
    };

    fetchRecent();
  }, []);

  useEffect(() => {
    const searchUsers = async () => {
      if (!query) {
        setUsers([]);
        return;
      }
      const { data } = await supabase
        .from('profiles')
        .select('id, username, avatar_url')
        .ilike('username', `%${query}%`)
        .limit(5);
      setUsers((data as any[]) || []);
    };

    searchUsers();
  }, [query]);
  
  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(query.toLowerCase()) &&
      (story.content || story.upload_url)
  );
  return (
    <>
      <main className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Featured Works
        </h1>
        <input
          type="text"
          placeholder="Search stories or users..."
          onChange={(e) => setQuery(e.target.value)}
          className="mb-2 w-full max-w-md p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition duration-150 ease-in-out"/>
        {users.length > 0 && (
          <ul className="mb-4 space-y-2 max-w-md">
            {users.map((u) => (
              <li key={u.id} className="flex items-center gap-2">
                <Image
                  src={u.avatar_url || '/default-avatar.png'}
                  alt="avatar"
                  width={24}
                  height={24}
                  unoptimized
                  className="w-6 h-6 rounded-full object-cover"
                />
                <Link href={`/profile/${u.id}`} className="text-indigo-400 hover:underline">
                  {u.username}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              description={story.description}
              price={`$${story.price}`}
              image_url={story.image_url}
              upload_url={story.upload_url}
              rating={story.rating ?? 0}
              reviews={story.reviews ?? 0}
            />
          ))}
        </div>

        <section className="mt-12 flex flex-col md:flex-row items-center gap-6">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">How Revenue Sharing Works</h2>
            <p className="mb-2">Literature Mill is built with a writer-first mindset. Our goal is to give creators maximum ownership of their work and the earnings that follow.</p>
            <p className="mb-2">Here’s how each purchase is distributed:</p>
            <ul className="list-disc pl-5 space-y-1 mb-2">
              <li>85% of the sale goes directly to the writer, ensuring you're rewarded fairly for your creativity and effort.</li>
              <li>5–10% is allocated to server and transaction costs, including hosting, file storage, and payment processing.</li>
              <li>The remaining 5% supports the ongoing development and maintenance of the platform, helping us build new features and improve user experience.</li>
            </ul>
            <p className="mb-4">This model is simple, sustainable, and focused on putting control in the hands of creators.</p>
            <Link href="/about" className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition">Learn More</Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/revenue_user.jpg"
              alt="Revenue sharing"
              className="max-w-xs sm:max-w-sm"
            />
          </div>
        </section>
      </main>
    </>
  );
}

