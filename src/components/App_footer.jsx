import React from 'react';
import { FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';
import { FiGlobe } from 'react-icons/fi';
import { TbCube } from 'react-icons/tb';

const App_footer = () => {
  return (
    <footer className="bg-black text-gray-400 mt-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-24 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10">

          {/* Logo */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <TbCube className="text-white text-4xl" />
          </div>

          {/* Product */}
          <div className="md:col-span-2 text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><a className="hover:text-white transition">Home</a></li>
              <li><a className="hover:text-white transition">Support</a></li>
              <li><a className="hover:text-white transition">Pricing</a></li>
              <li><a className="hover:text-white transition">Affiliate</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-3 text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><a className="hover:text-white transition">Company</a></li>
              <li><a className="hover:text-white transition">Blogs</a></li>
              <li><a className="hover:text-white transition">Community</a></li>

              <li className="flex justify-center sm:justify-start items-center gap-2">
                <a className="hover:text-white transition">Careers</a>
                <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md font-medium shadow-[0_0_10px_rgba(79,70,229,0.4)]">
                  We're hiring!
                </span>
              </li>

              <li><a className="hover:text-white transition">About</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2 text-center sm:text-left">
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a className="hover:text-white transition">Privacy</a></li>
              <li><a className="hover:text-white transition">Terms</a></li>
            </ul>
          </div>

          {/* Branding + Social */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end text-center md:text-right">
            <p className="text-sm leading-relaxed mb-6">
              Making every customer feel valued
              <br className="hidden md:block" />
              no matter the size of your audience.
            </p>

            <div className="flex gap-5 text-xl mb-6">
              <FiGlobe className="cursor-pointer hover:text-white" />
              <FaLinkedinIn className="cursor-pointer hover:text-white" />
              <FaTwitter className="cursor-pointer hover:text-white" />
              <FaYoutube className="cursor-pointer hover:text-white" />
            </div>

            <p className="text-xs">© 2025 PrebuiltUI</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default App_footer;
