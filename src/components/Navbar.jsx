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
  const openLogin = () => { setAuthType("login"); sethandLogin(true); };
  const openSignup = () => { setAuthType("signup"); sethandLogin(true); };

  const refreshUser = async () => {
    try {
      const res = await axiosWithToken().get("/profile");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) refreshUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <div className="w-full h-16 bg-white flex justify-around items-center fixed top-0 shadow z-50">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/menu")}>
          Order
        </h1>

        <div className="flex gap-4">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/menu")}>Menu</button>
          <button onClick={() => navigate("/booktable")}>Booktable</button>
          <button onClick={() => navigate("/contact")}>Contact</button>
        </div>

        <div className="flex items-center gap-4">
          <FaCartShopping onClick={() => navigate("/cart")} />

          {!user ? (
            <button className="bg-blue-600 text-white px-4 py-1 rounded" onClick={openLogin}>
              Login
            </button>
          ) : (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      {authType === "login" && (
        <Login
          isopen={handLogin}
          onclose={closeModal}
          openSignup={openSignup}
          onLoginSuccess={refreshUser}
        />
      )}

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
