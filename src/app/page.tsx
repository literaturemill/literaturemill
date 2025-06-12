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
  const [users, setUsers] = useState<{ id: string; username: string; avatar_url: string | null }[]>([]);

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
          placeholder="Search stories or users..."
          onChange={(e) => setQuery(e.target.value)}
          className="mb-2 w-full max-w-md p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
          transition duration-150 ease-in-out"/>
        {users.length > 0 && (
          <ul className="mb-4 space-y-2 max-w-md">
            {users.map((u) => (
              <li key={u.id} className="flex items-center gap-2">
                <img src={u.avatar_url || '/default-avatar.png'} className="w-6 h-6 rounded-full object-cover" />
                <a href={`/profile/${u.id}`} className="text-indigo-400 hover:underline">
                  {u.username}
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
          <StoryCard key={index} {...story} />
          ))}
        </div>
      </main>
    </>
  );
}

