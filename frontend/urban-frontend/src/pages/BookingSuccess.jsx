import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BookingSuccess() {
  const [booking, setBooking] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const latestBooking = localStorage.getItem("latestBooking");
    if (latestBooking) {
      setBooking(JSON.parse(latestBooking));
    }
  }, []);

  if (!booking) {
    return (
      <div className="text-center mt-20 text-lg text-gray-600">
        No booking details available.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
        🎉 Booking Confirmed!
      </h2>

      <div className="space-y-4 text-gray-700 mb-6">
        <div><strong>Customer:</strong> {booking.user?.name}</div>
        <div><strong>Email:</strong> {booking.user?.email}</div>
        <div><strong>Service:</strong> {booking.service?.name}</div>
        <div><strong>Provider:</strong> {booking.provider?.name} ({booking.provider?.experience} yrs)</div>
        <div><strong>Address:</strong> {booking.address}</div>
        <div><strong>Date:</strong> {new Date(booking.bookingDate).toDateString()}</div>
        <div><strong>Status:</strong> <span className="capitalize">{booking.status}</span></div>
        <div><strong>Paid Now:</strong> {booking.payNow ? "Yes 💳" : "No 💸"}</div>
      </div>

      {/* ✅ Go Home Button */}
      <div className="text-center">
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default BookingSuccess;
