import React, { useState } from "react";
import axios from "axios";
import { apiurl } from "../auth/utils/common/Common";

const Contact = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const API = import.meta.env.VITE_API_URL;

      const res = await axios.post(`${apiurl}/api/users/contact/contact`,
        formData
      );

      alert(res.data.message);

      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      alert(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-20">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Have a question, feedback, or need help?
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-3 border rounded-lg"
          />

          <textarea
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-3 border rounded-lg"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

        </form>

        <div className="mt-8 text-center text-gray-600">
          <p>Email: support@yourrestaurant.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: Main Street, Your City</p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
