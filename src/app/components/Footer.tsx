const Footer = () => {
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
              <li><a href="/signin" className="hover:text-white">Sign In</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-lg font-semibold mb-2">Connect</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="https://twitter.com/literaturemill" className="hover:text-white" target="_blank">Twitter</a></li>
              <li><a href="https://instagram.com/literaturemill" className="hover:text-white" target="_blank">Instagram</a></li>
              <li><a href="mailto:support@literaturemill.com" className="hover:text-white">support@literaturemill.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center text-gray-500">
          &copy; 2025 Literature Mill. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
