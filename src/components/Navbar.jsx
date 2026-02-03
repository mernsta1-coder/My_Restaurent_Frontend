import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Login from "../Pages/auth/Login";
import Sign_up from "../Pages/auth/Sign_up"; // ✅ FIXED IMPORT
import { axiosWithToken } from "../Pages/auth/utils/common/AxiosWithToken";

const Navbar = ({ cartCount }) => {
  const [authType, setAuthType] = useState("login");
  const [handLogin, sethandLogin] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const closeModal = () => sethandLogin(false);

  const openLogin = () => {
    setAuthType("login");
    sethandLogin(true);
  };

  const openSignup = () => {
    setAuthType("signup");
    sethandLogin(true);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axiosWithToken().get("/profile");
        setUser(res.data.user);
      } catch (err) {
        console.log("Error fetching user:", err.message);
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="w-full h-16 bg-white flex justify-around items-center fixed top-0 shadow z-50">
        <div className="flex-none w-16 ms-4">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/menu")}
          >
            Order
          </h1>
        </div>

        <div className="flex justify-evenly w-1/3">
          <button onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </button>
          <button onClick={() => navigate("/menu")} className="cursor-pointer">
            Menu
          </button>
          <button
            onClick={() => navigate("/booktable")}
            className="cursor-pointer"
          >
            Booktable
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="cursor-pointer"
          >
            Contact
          </button>
        </div>

        <div className="flex items-center gap-4">
          {/* CART ICON */}
          <div className="relative">
            <button
              onClick={() => navigate("/cart")}
              className="cursor-pointer"
            >
              <FaCartShopping size={22} />
            </button>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {!user ? (
            <input
              type="button"
              value="Login"
              className="bg-blue-600 text-white px-4 py-1 rounded-md cursor-pointer"
              onClick={openLogin}
            />
          ) : (
            <div className="flex items-center gap-2">
              <span>Welcome, {user.name}</span>

              <button
                className="bg-green-600 text-white px-2 py-1 rounded-md cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                Profile
              </button>

              <button
                className="bg-red-600 text-white px-2 py-1 rounded-md cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* LOGIN MODAL */}
      {authType === "login" && (
        <Login
          isopen={handLogin}
          onclose={closeModal}
          openSignup={openSignup}
        />
      )}

      {/* SIGNUP MODAL */}
      {authType === "signup" && (
        <Sign_up
          isopen={handLogin}
          onclose={closeModal}
          openLogin={openLogin}
        />
      )}
    </>
  );
};

export default Navbar;
