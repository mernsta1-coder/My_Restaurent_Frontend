import React, { useEffect, useState } from "react";
import { axiosWithToken } from "../Pages/auth/utils/common/axiosWithToken";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axiosWithToken().get("/api/cart/get");

      if (res.data.success) {
        setCart(res.data.cart.items || []);
      }

      setLoading(false);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const removeItem = async (productId) => {
    try {
      await axiosWithToken().delete(`/api/cart/${productId}`);
      fetchCart();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axiosWithToken().put("/api/cart/update", {
        productId,
        quantity,
      });

      fetchCart();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    const randomOrderNo = Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrderNo);
    setOrderConfirmed(true);
  };

  const closeModal = () => {
    setOrderConfirmed(false);
  };

  if (loading) {
    return <h2 className="text-center mt-20">Loading Cart...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <h3 className="text-center">Your cart is empty</h3>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="px-3 py-1 border rounded cursor-pointer"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>

                  <span className="px-3 py-1 border rounded-md cursor-pointer">
                    {item.quantity}
                  </span>

                  <button
                    className="px-3 py-1 border rounded cursor-pointer"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <span className="font-semibold ">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <>
            <div className="mt-8 border-t pt-6">
              <div className="flex justify-between text-xl font-bold text-gray-800 mt-4">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-8 bg-blue-600 cursor-pointer text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {/* Popup Modal (without dark background) */}
      {orderConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-lg pointer-events-auto">
            <h3 className="text-2xl font-bold mb-4">Order Confirmed! 🎉</h3>
            <p className="text-lg mb-2">
              Your Order Number: <span className="font-mono">{orderNumber}</span>
            </p>
            <p className="text-gray-700 mb-4">
              Please go to the counter for confirming your order.
            </p>
            <button
              onClick={closeModal}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
