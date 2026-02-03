import React, { useState } from "react";
import Auth from "../../components/Auth";

import axios from "axios";

const Sign_up = ({ isopen, onclose, openLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  // Submit handler
  const Submit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        // Optional alert for feedback
        alert("Registration successful! Redirecting to login...");

        // Close signup modal
        onclose();

        // Open login modal
        openLogin();
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.log("Error during registration:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Server error");
    }
  };

  return (
    <Auth
      isopen={isopen}
      onClose={onclose}
      onSubmit={Submit} // triggered by Enter key or button click
      heading="Sign Up"
      buttonText="Register"
      fields={[
        { type: "text", name: "name", placeholder: "Enter your name", required: true },
        { type: "email", name: "email", placeholder: "Enter your email", required: true },
        { type: "password", name: "password", placeholder: "Enter your password", required: true },
        { type: "password", name: "confirmPassword", placeholder: "Confirm your password", required: true },
      ]}
      openLogin={openLogin} // allows switching to login manually too
      onChange={handleChange}
    />
  );
};

export default Sign_up;
