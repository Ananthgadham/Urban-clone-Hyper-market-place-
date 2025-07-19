import { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [reviewData, setReviewData] = useState({ bookingId: "", rating: 5, comment: "" });

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5555/api/bookings/my", {
        withCredentials: true,
      });
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(
        `http://localhost:5555/api/bookings/cancel/${bookingId}`,
        {},
        { withCredentials: true }
      );
      const updated = bookings.map((b) =>
        b._id === bookingId ? { ...b, status: "cancelled" } : b
      );
      setBookings(updated);
    } catch (err) {
      setError("Failed to cancel booking");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5555/api/reviews/${reviewData.bookingId}`,
        {
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        { withCredentials: true }
      );
      setShowModal(false);
      fetchBookings(); // Refresh booking list to show updated status
    } catch (err) {
      console.error("Review submission error", err);
      alert("Failed to submit review.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">📅 My Bookings</h2>
      {error && <p className="text-red-600">{error}</p>}

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings found.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="p-4 bg-white shadow rounded-md border border-gray-200"
            >
              <div className="mb-2">
                <strong>Service:</strong> {b.service?.name}
              </div>
              <div className="mb-2">
                <strong>Provider:</strong> {b.provider?.name}
              </div>
              <div className="mb-2">
                <strong>Date:</strong> {new Date(b.bookingDate).toDateString()}
              </div>
              <div className="mb-2">
                <strong>Address:</strong> {b.address}
              </div>
              <div className="mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={`capitalize font-semibold ${
                    b.status === "cancelled"
                      ? "text-red-600"
                      : b.status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {b.status}
                </span>
              </div>

              {/* Cancel Button */}
              {b.status === "pending" && (
                <button
                  onClick={() => handleCancel(b._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              )}

              {/* Review Button */}
              {b.status === "completed" && (
                <div className="mt-2">
                  {b.review ? (
                    <p className="text-green-600 font-medium">✅ Review Submitted</p>
                  ) : (
                    <button
                      onClick={() =>
                        setReviewData({ bookingId: b._id, rating: 5, comment: "" }) ||
                        setShowModal(true)
                      }
                      className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                    >
                      Write Review
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Submit Review</h3>
            <label className="block mb-2">Rating (1 to 5)</label>
            <input
              type="number"
              min="1"
              max="5"
              value={reviewData.rating}
              onChange={(e) =>
                setReviewData({ ...reviewData, rating: Number(e.target.value) })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <label className="block mb-2">Comment</label>
            <textarea
              rows="3"
              value={reviewData.comment}
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
