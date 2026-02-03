import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-20 gap-x-8">
        
        {/* Card 1 */}
        <div className="relative bg-white border border-gray-100 rounded-xl shadow-sm px-6 pb-8 pt-16 flex flex-col items-center text-center">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="Donald Jackman"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Donald Jackman</h3>
          <p className="text-slate-500 text-sm mb-4">Content Creator</p>
          <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
            I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
          </p>
          <div className="flex gap-1 text-orange-500">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative bg-white border border-gray-100 rounded-xl shadow-sm px-6 pb-8 pt-16 flex flex-col items-center text-center">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <img 
              src="https://randomuser.me/api/portraits/men/44.jpg" 
              alt="Richard Nelson"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Richard Nelson</h3>
          <p className="text-slate-500 text-sm mb-4">Instagram Influencer</p>
          <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
            I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
          </p>
          <div className="flex gap-1 text-orange-500">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative bg-white border border-gray-100 rounded-xl shadow-sm px-6 pb-8 pt-16 flex flex-col items-center text-center">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2">
            <img 
              src="https://randomuser.me/api/portraits/women/44.jpg" 
              alt="James Washington"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-slate-800">James Washington</h3>
          <p className="text-slate-500 text-sm mb-4">Marketing Manager</p>
          <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
            I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
          </p>
          <div className="flex gap-1 text-orange-500">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;