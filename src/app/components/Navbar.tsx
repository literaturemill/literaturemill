'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { supabase } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';


export default function Navbar() {
  const categories = ['Fiction', 'Non-fiction', 'Poetry', 'Sci-Fi', 'Fantasy', 'Romance'];

  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in');
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  getUser();
}, []);


  return (
    <nav className="w-full bg-gray-900 shadow-md p-4 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <div className="flex items-center space-x-2 hover:opacity-80 transition duration-300">
            <img
              src="/windmill.jpg"
              alt="Literature Mill logo"
              className="w-8 h-8 rounded-sm object-cover shadow-sm"
            />
            <span className="text-2xl font-bold text-white">Literature Mill</span>
          </div>
        </Link>
      </div>

      {/* Center Actions */}
      <div className="flex gap-4 text-gray-300 relative">
        <Link href="/publish" className="hover:text-indigo-400 transition">
        Publish
        </Link>

    
      {user && (
  <Link href="/dashboard" className="ml-auto text-white hover:text-indigo-400 transition">
    Dashboard
  </Link>
)}

  
        <Link href="/find">
        <button className="hover:text-indigo-400 transition" onClick={() => {}}>
          Find a Story/Book
          </button>
          </Link>

        <div className="relative">
          <button
            onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
            className="hover:text-indigo-400 transition"
          >
            Categories ▾
          </button>

          {openCategoryDropdown && (
            <ul className="absolute top-full mt-2 bg-white border rounded p-2 z-50 text-black shadow-md w-48">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="p-2 hover:bg-indigo-100 cursor-pointer rounded"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {user ? (
  <div className="relative">
    <button
      className="text-white hover:text-indigo-400 transition"
      onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
    >
      {user?.email?.split('@')[0]} ⬇️
    </button>
    {openProfileDropdown && (
      <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-40 p-2 z-50">
        <Link href="/dashboard">
          <span className="block w-full text-left hover:bg-indigo-100 p-2 rounded cursor-pointer">
            Dashboard
          </span>
        </Link>
        <button
          className="block w-full text-left hover:bg-indigo-100 p-2 rounded"
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.href = '/'; // redirect to home
          }}
        >
          Sign Out
        </button>
      </div>
    )}
  </div>
) : (
  <div className="flex gap-3">
    <button
      onClick={() => {
        setView('sign_in');
        setOpen(true);
      }}
      className="border border-indigo-400 text-indigo-400 px-4 py-1 rounded-md hover:bg-indigo-500 hover:text-white transition"
    >
      Sign In
    </button>
    <button
      onClick={() => {
        setView('sign_up');
        setOpen(true);
      }}
      className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-1 rounded-md shadow-sm transition"
    >
      Sign Up
    </button>
  </div>
)}

      {/* Modal */}
      <AuthModal
        isOpen={open}
        onClose={() => setOpen(false)}
        initialView={view}
      />
    </nav>
  );
}

