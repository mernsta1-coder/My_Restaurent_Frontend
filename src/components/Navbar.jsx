import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Login from "../Pages/auth/Login";
import Sign_up from "../Pages/auth/Sign_up";
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

  // 🔹 Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axiosWithToken().get("/profile");
        setUser(res.data.user);
      } catch (err) {
        console.error("Profile fetch failed:", err.message);
        localStorage.removeItem("token");
        setUser(null);
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
      {/* NAVBAR */}
      <div className="w-full h-16 bg-white flex justify-around items-center fixed top-0 shadow z-50">
        {/* LOGO */}
        <div className="flex-none w-16 ms-4">
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/menu")}
          >
            Order
          </h1>
        </div>

        {/* NAV LINKS */}
        <div className="flex justify-evenly w-1/3">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/menu")}>Menu</button>
          <button onClick={() => navigate("/booktable")}>Booktable</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* CART */}
          <div className="relative">
            <button onClick={() => navigate("/cart")}>
              <FaCartShopping size={22} />
            </button>

            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* AUTH SECTION */}
          {!user ? (
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded-md"
              onClick={openLogin}
            >
              Login
            </button>
          ) : (
            <div className="flex items-center gap-3">
              <span className="font-medium">Hi, {user.name}</span>

              {/* ADD PROFILE BUTTON */}
              <button
                className="bg-indigo-600 text-white px-3 py-1 rounded-md"
                onClick={() => navigate("/profile")}
              >
                Add Profile
              </button>

              {/* LOGOUT */}
              <button
                className="bg-red-600 text-white px-3 py-1 rounded-md"
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
