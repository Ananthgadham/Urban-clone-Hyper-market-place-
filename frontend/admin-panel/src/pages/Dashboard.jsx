// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/auth/me", {
        withCredentials: true,
      })
      .then(() => {
        setLoading(false); // Token valid, load dashboard
      })
      .catch(() => {
        navigate("/login"); // Invalid or expired token
      });
  }, [navigate]);

  if (loading) return <div className="p-6">Verifying token...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
      <p className="mt-2 text-gray-700">Welcome, Admin!</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          to="/users"
          className="block p-4 bg-white shadow-md rounded-lg hover:bg-blue-50"
        >
          <h2 className="text-lg font-semibold">Manage Users</h2>
          <p className="text-gray-600">View and delete user accounts</p>
        </Link>
        <Link
          to="/providers"
          className="block p-4 bg-white shadow-md rounded-lg hover:bg-blue-50"
        >
          <h2 className="text-lg font-semibold">Manage Providers</h2>
          <p className="text-gray-600">Add or remove service providers</p>
        </Link>
        <Link
          to="/services"
          className="block p-4 bg-white shadow-md rounded-lg hover:bg-blue-50"
        >
          <h2 className="text-lg font-semibold">Manage Services</h2>
          <p className="text-gray-600">Add or update services</p>
        </Link>
        <Link
          to="/bookings"
          className="block p-4 bg-white shadow-md rounded-lg hover:bg-blue-50"
        >
          <h2 className="text-lg font-semibold">View Bookings</h2>
          <p className="text-gray-600">Monitor and update booking status</p>
        </Link>
        <Link
  to="/admin-reviews"
  className="block p-4 bg-white shadow-md rounded-lg hover:bg-blue-50"
>
  <h2 className="text-lg font-semibold">View Reviews</h2>
  <p className="text-gray-600">See all user reviews on services</p>
</Link>

      </div>
    </div>
  );
}
