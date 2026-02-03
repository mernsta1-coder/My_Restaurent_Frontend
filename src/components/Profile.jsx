import React, { useEffect, useState } from "react";
import { axiosWithToken } from "../Pages/auth/utils/common/AxiosWithToken";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const [userRes, bookingRes, messageRes] = await Promise.all([
          axiosWithToken().get("/api/users/profile"),
          axiosWithToken().get("/api/users/booking/all"),
          axiosWithToken().get("/api/users/contact/get/contact"),
        ]);

        setUser(userRes.data.user);
        setBookings(bookingRes.data.bookings || []);
        setMessages(messageRes.data.messages || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading profile...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-4 sm:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* USER INFO */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toDateString()}
          </p>
        </div>
      </div>

      {/* BOOKINGS */}
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4">My Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-gray-600">No bookings yet.</p>
        ) : (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Date</th>
                <th className="border p-2 text-left">Time</th>
                <th className="border p-2 text-left">Guests</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="border p-2">{b.date}</td>
                  <td className="border p-2">{b.time}</td>
                  <td className="border p-2">{b.guests}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* CONTACT MESSAGES */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">My Messages</h3>
        {messages.length === 0 ? (
          <p className="text-gray-600">No messages sent.</p>
        ) : (
          <ul className="space-y-4">
            {messages.map((m) => (
              <li
                key={m._id}
                className="border p-4 rounded-lg hover:shadow transition"
              >
                <p>
                  <strong>Subject:</strong> {m.subject}
                </p>
                <p className="mt-1 text-gray-700">{m.message}</p>
                <p className="mt-2 text-sm text-gray-500">
                  {new Date(m.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
