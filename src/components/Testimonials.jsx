import React from 'react';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Donald Jackman",
      role: "Content Creator",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      review:
        "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
    {
      name: "Richard Nelson",
      role: "Instagram Influencer",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
      review:
        "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
    {
      name: "James Washington",
      role: "Marketing Manager",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
      review:
        "I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-16">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          What Our Customers Say
        </h2>
        <p className="mt-4 text-gray-600">
          Hear from people who have experienced our service firsthand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="relative bg-white border border-gray-100 rounded-xl shadow-md px-6 pt-16 pb-8 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            {/* Profile Image */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <img
                src={t.img}
                alt={t.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Name & Role */}
            <h3 className="text-xl font-bold text-gray-800">{t.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{t.role}</p>

            {/* Review */}
            <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-6">
              {t.review}
            </p>

            {/* Rating */}
            <div className="flex gap-1 text-orange-500">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
