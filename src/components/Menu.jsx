import React from 'react';
import { FaCartShopping } from "react-icons/fa6";
import burger from '../images/burger.jpg';
import fries from '../images/Fries.jpg';
import garlic_bread from '../images/garlic_bread.jpg';
import non_veg_pizza from '../images/non_veg_pizza.jpg';
import veg_pizza from '../images/veg_pizza.jpg';
import drinks from '../images/drinks.jpg';
import { axiosWithToken } from '../Pages/auth/utils/common/AxiosWithToken';

const Menu = () => {

  const menuItems = [
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Classic pizza with fresh tomatoes, mozzarella cheese, and basil.",
      price: 12.99,
      img: veg_pizza
    },
    {
      id: "2",
      name: "BBQ Chicken Pizza",
      description: "Spicy chicken with BBQ sauce, red onions, and cilantro.",
      price: 15.99,
      img: non_veg_pizza
    },
    {
      id: "3",
      name: "Burger",
      description: "Juicy beef patty with lettuce, tomato, cheese, and special sauce.",
      price: 10.99,
      img: burger
    },
    {
      id: "4",
      name: "Fries",
      description: "Crispy golden fries seasoned with sea salt.",
      price: 4.99,
      img: fries
    },
    {
      id: "5",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs.",
      price: 5.99,
      img: garlic_bread
    },
    {
      id: "6",
      name: "Drinks",
      description: "Refreshing beverages to complement your meal.",
      price: 2.99,
      img: drinks
    }
  ];

  const addToCart = async (item) => {
    try {
      const res = await axiosWithToken().post("/api/cart/add", {
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.img
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
    <>
      <h1 className='text-5xl text-center mt-16 font-bold'>
        Our <span className='text-yellow-300'>Menu</span>
      </h1>

      <p className='text-center mt-3 mb-3'>
        Explore our delicious selection of handcrafted dishes
      </p>

      <div className='grid grid-cols-4'>
        {menuItems.map((item) => (
          <div key={item.id} className='w-62 p-4'>
            <img src={item.img} alt={item.name} className='h-40 w-60 rounded-lg' />

            <h3 className='text-center font-bold'>{item.name}</h3>

            <p className='min-h-15 text-sm'>{item.description}</p>

            <div className='flex justify-between m-5'>
              <p>${item.price}</p>

              <button
                onClick={() => addToCart(item)}
                className="bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
              >
                <FaCartShopping className='inline' /> Add
              </button>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
