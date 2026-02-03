import React, { useState } from "react";
import Auth from "../../components/Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ isopen, onclose, openSignup, onLoginSuccess }) => {
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

        onclose();            // close modal
        onLoginSuccess();     // refresh navbar
        navigate("/menu");    // go forward
      }
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <Auth
      isopen={isopen}
      onClose={onclose}
      onSubmit={fetchData}
      heading="Login"
      buttonText="Submit"
      fields={[
        { name: "email", type: "email", placeholder: "Enter your email", required: true },
        { name: "password", type: "password", placeholder: "Enter your password", required: true },
      ]}
      openSignup={openSignup}
      onChange={handleChange}
    />
  );
};

export default Login;
