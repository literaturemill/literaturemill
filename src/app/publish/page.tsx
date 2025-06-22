'use client';

import { useState } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path if needed
import categories from '../components/categories';
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
  });
const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!coverFile) {
      alert('Please select a cover image.');
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert('You must be signed in to publish.');
      return;
    }

    const { data: imageUploadResult, error: imageError } = await supabase.storage
      .from('uploads')
      .upload(`${user.id}/${coverFile.name}`, coverFile);

    if (imageError) {
      console.error('Image upload error:', imageError);
      alert('Image upload failed.');
      return;
    }

    const imageUrl = `https://ooaziodpseuwgmtgevog.supabase.co/storage/v1/object/public/uploads/${user.id}/${coverFile.name}`;

    if (!form.upload_url) {
      alert('File upload still in progress. Please wait.');
      return;
    }

    const { error } = await supabase.from('books').insert({
      title: form.title,
      description: form.description,
      category: form.category,
      price: form.price,
      content: form.upload_url,
      author_id: user.id,
      image_url: imageUrl,
    });

    if (error) {
      alert('Error submitting: ' + error.message);
      return;
    }

    alert('Submitted successfully!');
    setForm({
      title: '',
      description: '',
      category: '',
      price: '',
      content: '',
      upload_url: '',
    });
    setCoverFile(null);
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
        {categories.map((cat) => (
          <option key={cat}>{cat}</option>
        ))}
     </select>

    <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-3 rounded bg-gray-100 text-black placeholder-gray-500"
        />
        
        <CoverImageUpload onSelect={(file) => setCoverFile(file)} />

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
