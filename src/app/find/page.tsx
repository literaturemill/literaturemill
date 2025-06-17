"use client";

import { useEffect, useState } from 'react';
import StoryCard from '../components/StoryCard';
import { supabase } from '../supabaseClient';
import Link from 'next/link';
import Image from 'next/image';


type Story = {
  book_id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  rating: number;
  reviews: number;
};

export default function FindPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<{ id: string; username: string; avatar_url: string | null }[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id ?? null);

  if (user) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_FUNCTION_URL}/recommend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: user.id }),
        });
        const data = await res.json();
        setStories(data);
      } else {
        const { data } = await supabase.from('trending_books').select('*').limit(12);
        setStories((data as Story[]) || []);
      }
    };
    init();
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-foreground">
        {userId ? 'Recommended For You' : 'Popular Stories'}
      </h1>
      <input
        type="text"
        placeholder="Search stories or users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-2 w-full max-w-md p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"/>
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
      {filteredStories.length === 0 ? (
        <p className="text-gray-400">No stories available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story.book_id} {...story} />
          ))}
        </div>
      )}
    </div>
  );
}
