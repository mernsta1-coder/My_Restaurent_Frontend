import React, { useEffect, useState } from "react";
import { axiosWithToken } from "../Pages/auth/utils/common/AxiosWithToken";
import { apiurl } from "../Pages/auth/utils/common/Common";

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
          axiosWithToken().get(`${apiurl}/api/users/profile`),
          axiosWithToken().get(`${apiurl}/api/users/booking/all`),
          axiosWithToken().get(`${apiurl}/api/users/contact/contact`),
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

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* USER INFO */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.createdAt).toDateString()}</p>
      </div>

      {/* BOOKINGS */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">My Bookings</h3>

        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Date</th>
                <th className="border p-2">Time</th>
                <th className="border p-2">Guests</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
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
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">My Messages</h3>

        {messages.length === 0 ? (
          <p>No messages sent.</p>
        ) : (
          <ul className="space-y-3">
            {messages.map((m) => (
              <li key={m._id} className="border p-3 rounded">
                <p><strong>Subject:</strong> {m.subject}</p>
                <p>{m.message}</p>
                <p className="text-sm text-gray-500">
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
