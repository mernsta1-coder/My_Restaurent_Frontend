import React, { useState } from "react";
import axios from "axios";

const Mail = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setStatus("Please enter a valid email.");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/mail/subscribe`,
        { email },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setStatus("Subscribed successfully! Check your inbox.");
        setEmail("");
      }
    } catch (err) {
      console.error(err);
      setStatus(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Server error. Please try later."
      );
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#10132b] p-6 sm:p-10 md:p-16 flex items-center justify-center min-h-[80vh]">
      <div className="text-center w-full max-w-xl">
        <p className="text-[#6366f1] text-sm font-semibold mb-2 sm:mb-4">
          Get updated
        </p>

        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Subscribe to our newsletter <br /> & get the latest news
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center w-full gap-3 sm:gap-0 sm:justify-center"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#1d1f3d] border-none text-white focus:outline-none rounded-full px-4 py-3 w-full sm:flex-1"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="mt-3 sm:mt-0 sm:ml-3 bg-[#6366f1] hover:bg-[#4f52cc] text-white font-semibold px-6 py-3 rounded-full transition duration-200 disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? "Submitting..." : "Subscribe now"}
          </button>
        </form>

        {status && (
          <p
            className={`mt-4 text-sm ${
              status.includes("successfully") ? "text-green-400" : "text-red-400"
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default Mail;
