'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import AuthModal from './AuthModal';
import { supabase } from '../supabaseClient';
import type { User } from '@supabase/supabase-js';
import categories from './categories';


export default function Navbar() {


  const [open, setOpen] = useState(false);
  const [view, setView] = useState<'sign_in' | 'sign_up'>('sign_in');
  const [openCategoryDropdown, setOpenCategoryDropdown] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profileUrl, setProfileUrl] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handler = (e: Event) => {
      const url = (e as CustomEvent<string>).detail;
      if (typeof url === 'string') {
        setProfileUrl(url);
      }
    };
    document.addEventListener('avatar-updated', handler);
    return () => document.removeEventListener('avatar-updated', handler);
  }, []);

useEffect(() => {
  const handleUser = async (currentUser: User | null) => {
    setUser(currentUser);

    if (currentUser) {
      const { error } = await supabase.from('profiles').upsert({
        id: currentUser.id,
        email: currentUser.email,
      });

      if (error) console.error('Profile insert error:', error);

      const { data } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', currentUser.id)
        .single();
      setProfileUrl(data?.avatar_url || null);
      } else {
      setProfileUrl(null);
    }
  };

  const getInitialUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    handleUser(user);
  };

  getInitialUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    handleUser(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);

  useEffect(() => {
  const stored = localStorage.getItem('theme');
  const initial = stored === 'light' || stored === 'dark' ? stored : 'dark';
  setTheme(initial as 'light' | 'dark');
  document.documentElement.setAttribute('data-theme', initial);
}, []);

useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}, [theme]);

useEffect(() => {
  if (!openCategoryDropdown) return;
  const handleClick = (e: MouseEvent) => {
    if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
      setOpenCategoryDropdown(false);
    }
  };
  document.addEventListener('mousedown', handleClick);
  return () => document.removeEventListener('mousedown', handleClick);
}, [openCategoryDropdown]);

  useEffect(() => {
  if (!openProfileDropdown) return;
  const handleClick = (e: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
      setOpenProfileDropdown(false);
    }
  };
  document.addEventListener('mousedown', handleClick);
  return () => document.removeEventListener('mousedown', handleClick);
  }, [openProfileDropdown]);
  

  return (
    <nav
      className="w-full shadow-md p-4 flex flex-wrap items-center justify-between bg-card gap-4"
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <div className="flex items-center space-x-2 hover:opacity-80 transition duration-300">
            <Image
              src="/windmill.jpg"
              alt="Literature Mill logo"
              width={32}
              height={32}
              className="w-8 h-8 rounded-sm object-cover shadow-sm"
            />
            <span className="text-2xl font-bold text-foreground">Literature Mill</span>
          </div>
        </Link>
      </div>

      {/* Center Actions */}
      <div className="flex flex-wrap justify-center items-center gap-3 text-foreground relative w-full md:w-auto order-last md:order-none">
        <Link href="/publish" className="hover:text-indigo-400 transition">
        Publish
        </Link>

    
      {user && (
  <Link href="/dashboard" className="text-foreground hover:text-indigo-400 transition">
    Dashboard
  </Link>
)}

  
        <Link href="/find">
         <button className="hover:text-indigo-400 transition" onClick={() => {}}>
           Find a Story/Book
          </button>
        </Link>
        <Link href="/about" className="hover:text-indigo-400 transition">
          About Us
        </Link>

        <div className="relative" ref={categoryRef}>
          <button
            onClick={() => setOpenCategoryDropdown(!openCategoryDropdown)}
            className="hover:text-indigo-400 transition"
          >
            Categories ▾
          </button>

          {openCategoryDropdown && (
            <ul className="absolute top-full mt-2 bg-card border rounded p-2 z-50 text-foreground shadow-md w-48">
              {categories.map((cat) => (
                <li key={cat} className="p-2 hover:bg-indigo-500/20 cursor-pointer rounded">
                  <Link href={`/categories/${encodeURIComponent(cat)}`}>{cat}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <button
        aria-label="Toggle Theme"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="w-9 h-9 rounded-full border flex items-center justify-center transition-colors duration-300 hover:opacity-80 bg-card text-foreground"
      >
        <span className="relative w-5 h-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`absolute inset-0 w-full h-full text-yellow-400 transition-opacity duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-0'}`}
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m17.657-7.657l-1.414 1.414M6.757 17.657l-1.414 1.414M17.657 17.657l-1.414-1.414M6.757 6.757L5.343 5.343" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={`absolute inset-0 w-full h-full text-indigo-300 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}
          >
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {user ? (
  <div className="relative" ref={profileRef}>
    <button
      className="w-8 h-8 rounded-full overflow-hidden border border-indigo-400"
      onClick={() => setOpenProfileDropdown(!openProfileDropdown)}
    >
            {user?.email?.split('@')[0]} ⬇️
            <Image
        src={profileUrl || '/default-avatar.png'}
        alt="profile"
        width={32}
        height={32}
        unoptimized
        className="w-full h-full object-cover"
      />
    </button>
    {openProfileDropdown && (
      <div className="absolute right-0 mt-2 bg-card text-foreground border rounded shadow-md w-40 p-2 z-50">
        <Link href="/dashboard">
          <span className="block w-full text-left hover:bg-indigo-500/20 p-2 rounded cursor-pointer">
            Dashboard
          </span>
              </Link>
              <Link href="/profile">
          <span className="block w-full text-left hover:bg-indigo-500/20 p-2 rounded cursor-pointer">
            Profile
          </span>
        </Link>
        <button
          className="block w-full text-left hover:bg-indigo-500/20 p-2 rounded"
          onClick={async () => {
            await supabase.auth.signOut();
            setUser(null);
            setProfileUrl(null);
            window.location.href = '/';
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

