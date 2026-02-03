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
        "http://localhost:5000/api/users/api/subscribe",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Axios automatically parses JSON
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
    <div className="bg-[#10132b] p-8 md:p-16 flex items-center justify-center min-h-[100vh]">
      <div className="text-center">
        <p className="text-[#6366f1] text-sm font-semibold mb-4">
          Get updated
        </p>

        <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
          Subscribe to our newsletter <br /> & get the latest news
        </h2>

        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full max-w-md bg-[#1d1f3d] rounded-full px-2"
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none w-full px-3"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-[#6366f1] text-white font-semibold px-6 rounded-full cursor-pointer hover:bg-[#4f52cc] transition duration-200 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Subscribe now"}
            </button>
          </form>
        </div>

        {status && (
          <p
            className={`mt-4 text-sm ${
              status.includes("successfully")
                ? "text-green-400"
                : "text-red-400"
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
