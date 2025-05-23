'use client';
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const categories = ["Fiction", "Non-fiction", "Poetry", "Sci-Fi", "Fantasy", "Romance"];

  return (
    <nav className="w-full bg-gray-900 shadow-md p-4 flex justify-between items-center">

        {/* Logo Section Below */}
<div className="flex items-center space-x-2">
  <Link href="/"
     className="flex items-center space-x-2 hover:opacity-80 transition duration-300">
      <img
        src="/windmill.jpg"
        alt="Literature Mill logo"
        className="w-8 h-8 rounded-sm object-cover shadow-sm"
      />
      <span className="text-2xl font-bold text-white-750">
        Literature Mill
      </span>
  </Link>
</div>


      <div className="flex gap-4 text-gray-700 relative">
        <button className="text-gray-200 hover:text-indigo-400">Publish</button>
        <button className="text-gray-200 hover:text-indigo-400">Find a Story/Book</button>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-200 hover:text-indigo-400 transition duration-200 
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
            
            Categories ▾
          </button>
          {open && (
            <ul className="absolute top-full mt-2 bg-white border shadow-md rounded p-2 w-40 z-50">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className="p-1 hover:bg-indigo-50 cursor-pointer"
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="border border-indigo-400 text-indigo-400 px-4 py-1 rounded-md hover:bg-indigo-500 hover:text-white transition
        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
          Sign In
        </button>
        <button className="bg-indigo-500 hover:bg-indigo-400 text-white px-4 py-1 rounded-md shadow-sm transition 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out">
          Sign Up
        </button>

      </div>
    </nav>
  );
}