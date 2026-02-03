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
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.subject || !formData.message) {
      setStatus("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      const res = await axios.post(`${apiurl}/api/users/contact/contact`, formData);

      setStatus(res.data.message);

      setFormData({
        fullName: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      setStatus(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6 sm:p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Contact Us
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Have a question, feedback, or need help? Send us a message!
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Subject */}
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Message */}
          <textarea
            rows="5"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <p className={`mt-4 text-center text-sm ${status.includes("failed") ? "text-red-500" : "text-green-500"}`}>
            {status}
          </p>
        )}

        {/* Contact Info */}
        <div className="mt-8 text-center text-gray-600 space-y-1">
          <p>Email: <a href="mailto:support@yourrestaurant.com" className="hover:underline">support@yourrestaurant.com</a></p>
          <p>Phone: <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a></p>
          <p>Address: Main Street, Your City</p>
        </div>

      </div>
    </div>
  );
};

export default Contact;
