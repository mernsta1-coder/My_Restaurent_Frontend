import React, { useState } from "react";
import Auth from "../../components/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ isopen, onClose, openSignup, onLoginSuccess }) => { // ✅ onClose fixed
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const fetchData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password }
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        onClose(); // ✅ close modal
        if (onLoginSuccess) onLoginSuccess(); // ✅ refresh navbar
        navigate("/menu");
      }
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <Auth
      isopen={isopen}
      onClose={onClose} // ✅ fixed
      onSubmit={fetchData}
      heading="Login"
      buttonText="Submit"
      fields={[
        { type: "email", name: "email", placeholder: "Enter your email", required: true },
        { type: "password", name: "password", placeholder: "Enter your password", required: true },
      ]}
      openSignup={openSignup}
      onChange={handleChange}
    />
  );
};

export default Login;
