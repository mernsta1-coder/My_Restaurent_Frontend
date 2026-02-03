import React from "react";
import logo from "../images/restaurent.jpg";
import { useNavigate } from "react-router-dom";

const Background = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative gi w-full min-h-[70vh] sm:min-h-[80vh]
                 bg-cover bg-center flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${logo})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 px-4">
        <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl mb-4">
          Welcome to our Restaurant
        </h1>

        <h2 className="text-white text-lg sm:text-xl md:text-2xl mb-8">
          Enjoy the best food in town
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/menu")}
            className="bg-red-600 hover:bg-red-700
                       text-white text-base sm:text-lg
                       px-6 py-2 rounded-lg transition"
          >
            All Menu
          </button>

          <button
            onClick={() => navigate("/booktable")}
            className="border border-white
                       text-white text-base sm:text-lg
                       px-6 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Book Table
          </button>
        </div>
      </div>
    </div>
  );
};

export default Background;
