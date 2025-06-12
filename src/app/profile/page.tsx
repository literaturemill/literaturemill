"use client";

import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

interface Profile {
  id: string;
  username: string;
  avatar_url: string | null;
  followers: number;
  following: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      setUser(user);
      const { data } = await supabase
        .from("profiles")
        .select("id, username, avatar_url, followers, following")
        .eq("id", user.id)
        .single();
      setProfile(data as Profile);
    };
    fetchData();
  }, []);

  const handleUpload = (url: string) => {
    if (profile) setProfile({ ...profile, avatar_url: url });
  };

  if (!user || !profile) return <p className="p-6">Loading profile...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 text-foreground">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <ProfilePictureUpload
        userId={user.id}
        avatarUrl={profile.avatar_url}
        onUpload={handleUpload}
      />
      <p className="mt-4">Username: {profile.username}</p>
      <p className="mt-1 text-sm text-gray-400">{user.email}</p>
      <div className="flex gap-4 mt-4">
        <span>Followers: {profile.followers}</span>
        <span>Following: {profile.following}</span>
      </div>
    </div>
  );
}