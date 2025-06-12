"use client";

import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

interface Props {
  targetId: string;
  currentUserId: string;
}

export default function FollowButton({ targetId, currentUserId }: Props) {
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const checkFollow = async () => {
      const { data } = await supabase
        .from("follows")
        .select("id")
        .eq("follower_id", currentUserId)
        .eq("following_id", targetId)
        .single();
      setFollowing(!!data);
    };
    checkFollow();
  }, [currentUserId, targetId]);

  const toggleFollow = async () => {
    if (following) {
      await supabase
        .from("follows")
        .delete()
        .eq("follower_id", currentUserId)
        .eq("following_id", targetId);
      await supabase.rpc('decrement_follow', { target_id: targetId });
      setFollowing(false);
    } else {
      await supabase.from("follows").insert({
        follower_id: currentUserId,
        following_id: targetId,
      });
      await supabase.rpc('increment_follow', { target_id: targetId });
      setFollowing(true);
    }
  };

  if (currentUserId === targetId) return null;

  return (
    <button
      onClick={toggleFollow}
      className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1 rounded"
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}