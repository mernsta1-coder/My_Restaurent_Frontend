import React, { useState } from "react";
import Auth from "../../components/Auth";
import axios from "axios";



const Login = ({ isopen, onclose, openSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
      });

      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        console.log("Login successful, token saved:", token);
        onclose(); // close modal
        window.location.reload(); // <-- reloads page to rerender
      } else {
        console.log("Login failed:", response.data.message);
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
        {
          name: "email",
          type: "email",
          placeholder: "Enter your email",
          required: true,
        },
        {
          name: "password",
          type: "password",
          placeholder: "Enter your password",
          required: true,
        },
      ]}
      openSignup={openSignup}
      onChange={handleChange}
    />
  );
};

export default Login;
