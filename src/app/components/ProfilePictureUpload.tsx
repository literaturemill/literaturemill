"use client";

import { useRef, useState } from "react";
import { supabase } from "../supabaseClient";
import Image from "next/image";

interface Props {
  userId: string;
  avatarUrl?: string | null;
  onUpload?: (url: string) => void;
}

export default function ProfilePictureUpload({ userId, avatarUrl, onUpload }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const filePath = `${userId}/${file.name}`;
    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (!error) {
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      await supabase
        .from("profiles")
        .update({ avatar_url: data.publicUrl })
        .eq("id", userId);
      onUpload?.(data.publicUrl);
    }

    setUploading(false);
  };

  return (
    <div className="flex items-center gap-4">
      <Image
        src={avatarUrl || "/default-avatar.png"}
        alt="avatar"
        width={64}
        height={64}
        unoptimized
        className="w-16 h-16 rounded-full object-cover"
      />
      <input
        type="file"
        accept="image/*"
        ref={fileRef}
        onChange={handleUpload}
        disabled={uploading}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-1 rounded"
      >
        {uploading ? "Uploading..." : "Change"}
      </button>
    </div>
  );
}