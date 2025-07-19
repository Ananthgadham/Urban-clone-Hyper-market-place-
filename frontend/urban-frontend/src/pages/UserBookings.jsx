// src/pages/UserBookings.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/bookings/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white shadow p-4 rounded-md border-l-4 border-blue-600"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {b.services.map((s) => s.name).join(", ")}
              </h2>
              <p className="text-gray-600 text-sm">Date: {b.date}</p>
              <p className="text-gray-600 text-sm">Time: {b.time}</p>
              <p className="text-gray-600 text-sm">Address: {b.address}</p>
              <p className="text-sm text-green-600 font-medium mt-1">Status: {b.status}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserBookings;
