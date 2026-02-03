import React from "react";
import burger from "../images/burger.jpg";
import fries from "../images/Fries.jpg";
import garlic_bread from "../images/garlic_bread.jpg";
import non_veg_pizza from "../images/non_veg_pizza.jpg";
import veg_pizza from "../images/veg_pizza.jpg";
import drinks from "../images/drinks.jpg";

const Food_catogories = () => {
  const categories = [
    { id: 1, name: "Pizza", img: veg_pizza },
    { id: 2, name: "Non-Veg Pizza", img: non_veg_pizza },
    { id: 3, name: "Burger", img: burger },
    { id: 4, name: "Fries", img: fries },
    { id: 5, name: "Garlic Bread", img: garlic_bread },
    { id: 6, name: "Stuffed Mushroom", img: garlic_bread },
    { id: 7, name: "Drinks", img: drinks },
  ];

  return (
    <>
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl mt-6 font-bold">
        Explore our <span className="text-yellow-400">Categories</span>
      </h1>

      <p className="text-center mt-3 text-sm sm:text-base text-gray-600">
        Discover delicious dishes from our carefully curated categories
      </p>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center text-center
                       cursor-pointer transition-transform
                       hover:scale-105"
          >
            <img
              src={category.img}
              alt={category.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full
                         object-cover shadow-md"
            />

            <h2 className="text-sm sm:text-base font-medium mt-3">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Food_catogories;
