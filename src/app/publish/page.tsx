'use client';

import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path if needed
import RichTextEditor from './RichTextEditor';
import FileUpload from './FileUpload';
import TitleEditor from './TitleEditor';
import CoverImageUpload from './CoverImageUpload';

export default function PublishPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    content: '',
    upload_url: '',
    image_url: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('books').insert([form]);
    if (error) {
      alert('Error submitting: ' + error.message);
    } else {
      alert('Submitted successfully!');
      setForm({ title: '', description: '', category: '', price: '', content: '', upload_url: '', image_url: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-gray-800 text-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Publish Your Story</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
    <TitleEditor
        value={form.title}
        onChange={(html: string) => setForm({ ...form, title: html })}
    />

    <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-100 text-black placeholder-gray-500"
    />

    <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-100 text-black placeholder-gray-500"
    >
        <option value="">Select category</option>
        <option>Fiction</option>
        <option>Non-fiction</option>
        <option>Poetry</option>
        <option>Sci-Fi</option>
        <option>Fantasy</option>
        <option>Romance</option>
        <option>Misc</option>
     </select>

    <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-100 text-black placeholder-gray-500"
        />
        
        <CoverImageUpload
      onUpload={(url) =>
        setForm((prev) => ({
          ...prev,
          image_url: url,
        }))
      }
    />

    <RichTextEditor
    value={form.content}
    onChange={(html: string) => setForm({ ...form, content: html })}
    />

    <FileUpload
  onUpload={(url) =>
    setForm((prev) => ({
      ...prev,
      upload_url: url,
    }))
  }
/>
        
  <button
    type="submit"
    className="bg-purple-600 px-6 py-3 rounded hover:bg-purple-700 transition"
   >
    Submit
    </button>
        
</form>
    </div>
  );
}
