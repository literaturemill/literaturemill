'use client';

import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function FileUpload({
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
      .upload(`books/${Date.now()}-${file.name}`, file);

    if (error) {
      console.error('Upload error:', error.message);
      alert('File upload failed!');
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
      <label className="block text-white font-medium mb-2">
        Upload your book file (PDF, DOCX, etc)
      </label>
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="block w-full text-white"
      />
      {uploading && <p className="text-sm text-gray-400 mt-2">Uploading...</p>}
      {fileName && <p className="text-sm text-green-400 mt-2">Uploaded: {fileName}</p>}
    </div>
  );
}

