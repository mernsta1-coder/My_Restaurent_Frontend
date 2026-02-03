import React, { useEffect, useState } from "react";
import { axiosWithToken } from "../Pages/auth/utils/common/AxiosWithToken";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axiosWithToken().get("/api/users/cart/get");
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
    await axiosWithToken().delete(`/api/users/cart/delete/${productId}`);
    fetchCart();
  };

  const updateQuantity = async (productId, quantity) => {
    await axiosWithToken().put("/api/users/cart/update", {
      productId,
      quantity,
    });
    fetchCart();
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000));
    setOrderConfirmed(true);
  };

  if (loading) {
    return <h2 className="text-center mt-24">Loading Cart...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <h3 className="text-center">Your cart is empty</h3>
        ) : (
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.productId}
                className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>

                  <span className="px-3 py-1 border rounded-md">
                    {item.quantity}
                  </span>

                  <button
                    className="px-3 py-1 border rounded"
                    onClick={() =>
                      updateQuantity(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <span className="font-semibold min-w-[70px]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded"
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
              <div className="flex justify-between text-lg sm:text-xl font-bold">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg
                         font-semibold hover:bg-blue-700 transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {/* Order Popup */}
      {orderConfirmed && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-sm w-full text-center shadow-xl">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">
              Order Confirmed 🎉
            </h3>
            <p className="mb-2">
              Order No:{" "}
              <span className="font-mono font-semibold">{orderNumber}</span>
            </p>
            <p className="text-gray-700 mb-4">
              Please go to the counter to confirm your order.
            </p>
            <button
              onClick={() => setOrderConfirmed(false)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
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
