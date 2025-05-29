"use client";

import { useState } from "react";
import AuthModal from "./AuthModal";

const Footer = () => {
  const [open, setOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold mb-2">Literature Mill</h3>
            <p className="text-sm text-gray-400">
              Bringing stories to life, one page at a time.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/publish" className="hover:text-white">Publish</a></li>
              <li><a href="/categories" className="hover:text-white">Categories</a></li>
              <li>
              <button
                onClick={() => setOpen(true)}
                className="hover:text-white focus:outline-none">
                Sign In
              </button>
            </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Connect</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="https://x.com/LiteratureMill" className="hover:text-white" target="https://x.com/LiteratureMill">X</a></li>
              <li><a href="https://www.tiktok.com/@literaturemill?_t=ZN-8wb08W7fdLy&_r=1" className="hover:text-white" target="https://www.tiktok.com/@literaturemill?_t=ZN-8wb08W7fdLy&_r=1">TikTok</a></li>
              <li><a href="https://www.instagram.com/literaturemill1?igsh=cmFjMGgyOTJzdWd0&utm_source=qr" className="hover:text-white" target="https://www.instagram.com/literaturemill1?igsh=cmFjMGgyOTJzdWd0&utm_source=qr">Instagram</a></li>
              <li><a href="mailto:literaturemill@gmail.com" className="hover:text-white">literaturemill@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center text-gray-500">
          &copy; 2025 Literature Mill. All rights reserved.
        </div>
      </div>
      <AuthModal isOpen={open} onClose={() => setOpen(false)} />
    </footer>
  );
};

export default Footer;

