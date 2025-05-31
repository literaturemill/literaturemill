'use client';

import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path if needed

export default function PublishPage() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    content: ''
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
      setForm({ title: '', description: '', category: '', price: '', content: '' });
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 bg-gray-800 text-white rounded-xl shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Publish Your Story</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
    <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-100 text-black placeholder-gray-500"
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

    <textarea
        name="content"
        placeholder="Preview or Content"
        value={form.content}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-100 text-black placeholder-gray-500"
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
