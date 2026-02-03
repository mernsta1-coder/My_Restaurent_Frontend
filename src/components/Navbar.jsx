import React, { useState, useEffect } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Login from "../Pages/auth/Login";
import Sign_up from "../Pages/auth/Sign_up";
import { axiosWithToken } from "../Pages/auth/utils/common/AxiosWithToken";

const Navbar = ({ cartCount }) => {
  const [authType, setAuthType] = useState("login");
  const [handLogin, setHandLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const closeModal = () => {
    setHandLogin(false);
    fetchUser(); // Update UI after login/signup
  };

  const openLogin = () => {
    setAuthType("login");
    setHandLogin(true);
  };

  const openSignup = () => {
    setAuthType("signup");
    setHandLogin(true);
  };

  // Fetch user profile
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setUser(null);

    try {
      const res = await axiosWithToken().get("/api/users/profile");
      setUser(res.data.user);
    } catch (err) {
      console.error("Profile fetch failed:", err.message);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  useEffect(() => {
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
      <nav className="fixed w-full bg-white shadow z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 h-16 flex items-center justify-between">
          
          {/* LOGO */}
          <h1
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/menu")}
          >
            Order
          </h1>

          {/* NAV LINKS: Hidden on mobile */}
          <div className="hidden md:flex space-x-6">
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/menu")}>Menu</button>
            <button onClick={() => navigate("/booktable")}>Book Table</button>
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

            {/* AUTH BUTTONS */}
            {!user ? (
              <button
                className="bg-blue-600 text-white px-4 py-1 rounded-md"
                onClick={openLogin}
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="font-medium hidden sm:inline">Hi, {user.name}</span>
                <button
                  className="bg-indigo-600 text-white px-3 py-1 rounded-md"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded-md"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-xl font-bold"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white px-4 pt-2 pb-4 flex flex-col gap-3">
            <button onClick={() => {navigate("/"); setMenuOpen(false);}}>Home</button>
            <button onClick={() => {navigate("/menu"); setMenuOpen(false);}}>Menu</button>
            <button onClick={() => {navigate("/booktable"); setMenuOpen(false);}}>Book Table</button>
            <button onClick={() => {navigate("/contact"); setMenuOpen(false);}}>Contact</button>
          </div>
        )}
      </nav>

      {/* LOGIN MODAL */}
      {authType === "login" && (
        <Login isopen={handLogin} onClose={closeModal} openSignup={openSignup} />
      )}

      {/* SIGNUP MODAL */}
      {authType === "signup" && (
        <Sign_up isopen={handLogin} onClose={closeModal} openLogin={openLogin} />
      )}
    </>
  );
};

export default Navbar;
