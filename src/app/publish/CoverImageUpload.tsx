'use client';

import { useState } from 'react';


export default function CoverImageUpload({
  onSelect,
}: {
  onSelect: (file: File) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setFileName(file.name);

    onSelect(file);
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