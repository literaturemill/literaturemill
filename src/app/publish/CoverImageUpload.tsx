'use client';

import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function CoverImageUpload({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`covers/${Date.now()}-${file.name}`, file);

    if (error) {
      console.error('Upload error:', error.message);
      alert('Cover upload failed! User needs to be signed in to upload, for other issues please contact Support');
    } else {
      const publicURL = supabase.storage
        .from('uploads')
        .getPublicUrl(data.path).data.publicUrl;
      onUpload(publicURL);
    }

    setUploading(false);
  };

  return (
    <div className="my-4">
      <label className="block text-white font-medium mb-2">Cover Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-white file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 hover:file:bg-blue-700"
      />
      {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
      {fileName && <p className="text-sm text-green-400 mt-2">Uploaded: {fileName}</p>}
    </div>
  );
}