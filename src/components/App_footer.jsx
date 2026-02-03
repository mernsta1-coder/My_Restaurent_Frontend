import React from 'react';
import { FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';
import { TbCube } from 'react-icons/tb'; // Using a cube icon as a placeholder for the logo

const App_footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-16 mt-10 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Logo Section */}
        <div className="md:col-span-2">
          <TbCube className="text-white text-4xl" />
        </div>

        {/* Product Links */}
        <div className="md:col-span-2">
          <h3 className="text-white font-semibold mb-4">Product</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Affiliate</a></li>
          </ul>
        </div>

        {/* Resources Links */}
        <div className="md:col-span-3">
          <h3 className="text-white font-semibold mb-4">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Company</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blogs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
            <li className="flex items-center gap-2">
              <a href="#" className="hover:text-white transition-colors">Careers</a>
              <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md font-medium shadow-[0_0_10px_rgba(79,70,229,0.4)]">
                We're hiring!
              </span>
            </li>
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="md:col-span-2">
          <h3 className="text-white font-semibold mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>

        {/* Right Side Branding & Socials */}
        <div className="md:col-span-3 flex flex-col items-start md:items-end text-left md:text-right">
          <p className="text-sm leading-relaxed mb-6">
            Making every customer feel valued—<br className="hidden md:block" />
            no matter the size of your audience.
          </p>
          
          <div className="flex gap-4 text-xl mb-8">
            <FiGlobe className="cursor-pointer hover:text-white" />
            <FaLinkedinIn className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaYoutube className="cursor-pointer hover:text-white" />
          </div>

          <p className="text-xs">© 2025 PrebuiltUI</p>
        </div>

      </div>
    </footer>
  );
};

export default App_footer;