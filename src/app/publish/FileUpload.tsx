'use client';

import { useState } from 'react';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return alert('No file selected');
    
    // Implement file upload logic (e.g., Supabase storage)
    alert(`Ready to upload: ${file.name}`);
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="text-sm"
      />
      <button
        type="button"
        onClick={handleUpload}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Upload File
      </button>
    </div>
  );
}

