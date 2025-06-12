'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { supabase } from '../supabaseClient';


type Story = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [stories, setStories] = useState<Story[]>([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndStories = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/');
        return;
      }

      setUser(user);

      const { data: storyData } = await supabase
        .from('books')
        .select('*')
        .eq('author_id', user.id);

      setStories(storyData || []);

      const { data: profile } = await supabase
        .from('profiles')
        .select('followers, following')
        .eq('id', user.id)
        .single();

      setFollowers(profile?.followers ?? 0);
      setFollowing(profile?.following ?? 0);
    };

    fetchUserAndStories();
  }, [router]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Your Dashboard</h1>
      {user && <p className="mb-4">Logged in as: {user.email}</p>}
      <div className="grid grid-cols-3 gap-4 mb-6 text-center">
        <div className="p-4 bg-gray-800 rounded">
          <p className="text-lg font-semibold">{stories.length}</p>
          <p className="text-sm text-gray-400">Stories</p>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <p className="text-lg font-semibold">{followers}</p>
          <p className="text-sm text-gray-400">Followers</p>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <p className="text-lg font-semibold">{following}</p>
          <p className="text-sm text-gray-400">Following</p>
        </div>
      </div>

      <ul className="space-y-4">
        {stories.map((story) => (
          <li key={story.id} className="p-4 bg-gray-800 rounded">
            <h2 className="text-xl font-semibold">{story.title}</h2>
            <p className="text-sm text-gray-400">{story.description}</p>
            <p className="text-sm mt-1">Category: {story.category}</p>
            <p className="text-sm mt-1">Price: ${story.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
