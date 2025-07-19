// src/pages/Book.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Book() {
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [error, setError] = useState("");

  // Check auth via cookie & load providers
  useEffect(() => {
    axios
      .get("http://localhost:5555/api/auth/me", { withCredentials: true })
      .then(() => {
        const storedService = localStorage.getItem("selectedService");
        if (!storedService) return navigate("/dashboard");

        const parsedService = JSON.parse(storedService);
        setService(parsedService);

        axios
          .get(`http://localhost:5555/api/providers/by-service/${parsedService._id}`, {
            withCredentials: true,
          })
          .then((res) => setProviders(res.data))
          .catch((err) => {
            console.error("Provider fetch error:", err);
            setError("Failed to load providers.");
          });
      })
      .catch(() => navigate("/login")); // Redirect if not logged in
  }, []);

  const handleBooking = async (payNow = false) => {
    if (!selectedProvider || !address || !date || !time) {
      setError("Please fill in all fields.");
      return;
    }

    const bookingDate = `${date}T${time}`; // Combine date & time

    try {
      const res = await axios.post(
        `http://localhost:5555/api/bookings/create/${service._id}/${selectedProvider}`,
        { bookingDate, address, payNow },
        { withCredentials: true }
      );

      localStorage.setItem("latestBooking", JSON.stringify(res.data));
      navigate("/booking-success");
    } catch (err) {
      console.error("Booking error:", err);
      const msg = err.response?.data?.message || "Booking failed. Please try again.";
      setError(msg);

      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Book Service: {service?.name}
      </h2>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 p-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4">
        {/* Provider Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Provider
          </label>
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          >
            <option value="">-- Select Provider --</option>
            {providers.map((provider) => (
              <option key={provider._id} value={provider._id}>
                {provider.name} ({provider.experience} yrs)
              </option>
            ))}
          </select>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter service address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Time
          </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        <button
          onClick={() => handleBooking(false)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Book without Payment
        </button>
        <button
          onClick={() => handleBooking(true)}
          className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
        >
          Pay Now & Book
        </button>
      </div>
    </div>
  );
}

export default Book;
