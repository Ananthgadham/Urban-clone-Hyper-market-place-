import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const fetchReviews = () => {
    axios
      .get("http://localhost:5555/api/reviews", { withCredentials: true })
      .then((res) => setReviews(res.data))
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews");
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      axios
        .delete(`http://localhost:5555/api/admin/delete-review/${id}`, {
          withCredentials: true,
        })
        .then(() => {
          fetchReviews(); // Refresh list
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete review");
        });
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">All Service Reviews</h1>
      {error && <p className="text-red-500">{error}</p>}

      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((rev) => (
            <li key={rev._id} className="border p-4 rounded shadow-sm bg-white">
              <p className="text-gray-800 italic">"{rev.comment}"</p>
              <p className="text-blue-600 font-semibold">User: {rev.user?.name}</p>
              <p className="text-gray-600">Service: {rev.service?.name}</p>
              <p className="text-yellow-500 mb-2">
                {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
              </p>
              <button
                onClick={() => handleDelete(rev._id)}
                className="text-red-600 border border-red-500 px-3 py-1 rounded hover:bg-red-100 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
