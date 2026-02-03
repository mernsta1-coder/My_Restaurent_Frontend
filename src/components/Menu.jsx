import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import burger from "../images/burger.jpg";
import fries from "../images/Fries.jpg";
import garlic_bread from "../images/garlic_bread.jpg";
import non_veg_pizza from "../images/non_veg_pizza.jpg";
import veg_pizza from "../images/veg_pizza.jpg";
import drinks from "../images/drinks.jpg";
import { axiosWithToken } from "../Pages/auth/utils/common/AxiosWithToken";

const Menu = () => {
  const menuItems = [
    {
      id: "1",
      name: "Margherita Pizza",
      description:
        "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
      price: 12.99,
      img: veg_pizza,
    },
    {
      id: "2",
      name: "BBQ Chicken Pizza",
      description: "Spicy chicken with BBQ sauce, red onions, and cilantro.",
      price: 15.99,
      img: non_veg_pizza,
    },
    {
      id: "3",
      name: "Burger",
      description:
        "Juicy beef patty with lettuce, tomato, cheese, and special sauce.",
      price: 10.99,
      img: burger,
    },
    {
      id: "4",
      name: "Fries",
      description: "Crispy golden fries seasoned with sea salt.",
      price: 4.99,
      img: fries,
    },
    {
      id: "5",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs.",
      price: 5.99,
      img: garlic_bread,
    },
    {
      id: "6",
      name: "Drinks",
      description: "Refreshing beverages to complement your meal.",
      price: 2.99,
      img: drinks,
    },
  ];

  const addToCart = async (item) => {
    try {
      const res = await axiosWithToken().post("/api/users/cart/add", {
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.img,
      });

      if (res.data.success) {
        alert("Item added to cart successfully");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      if (err.response?.status === 401) {
        alert("Please login first to add items to cart");
      } else {
        alert("Error adding item to cart");
      }
    }
  };

  return (
    <div className="px-4 sm:px-8 md:px-16">
      <h1 className="text-3xl sm:text-4xl md:text-5xl text-center mt-16 font-bold">
        Our <span className="text-yellow-300">Menu</span>
      </h1>
      <p className="text-center mt-3 mb-6 text-gray-600">
        Explore our delicious selection of handcrafted dishes
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-center mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 flex-1 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <p className="font-semibold">${item.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
                >
                  <FaCartShopping /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
