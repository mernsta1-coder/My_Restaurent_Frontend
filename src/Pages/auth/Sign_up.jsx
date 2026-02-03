import React, { useState } from "react";
import Auth from "../../components/Auth";
import axios from "axios";

const Sign_up = ({ isopen, onClose, openLogin }) => { // ✅ onClose fixed
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const Submit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        { name, email, password }
      );

      if (res.data.success) {
        alert("Registration successful!");
        onClose(); // ✅ Close modal
        openLogin(); // ✅ Switch to login
      }
    } catch (err) {
      console.log("Signup error:", err.response?.data || err.message);
    }
  };

  return (
    <Auth
      isopen={isopen}
      onClose={onClose} // ✅ fixed
      onSubmit={Submit}
      heading="Sign Up"
      buttonText="Register"
      fields={[
        { type: "text", name: "name", placeholder: "Enter your name", required: true },
        { type: "email", name: "email", placeholder: "Enter your email", required: true },
        { type: "password", name: "password", placeholder: "Enter your password", required: true },
        { type: "password", name: "confirmPassword", placeholder: "Confirm your password", required: true },
      ]}
      openLogin={openLogin}
      onChange={handleChange}
    />
  );
};

export default Sign_up;
