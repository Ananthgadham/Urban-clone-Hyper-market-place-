import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');

  const fetchBookings = () => {
    axios.get('http://localhost:5555/api/bookings', { withCredentials: true })
      .then(res => setBookings(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to fetch bookings');
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    axios.put(`http://localhost:5555/api/bookings/${id}/status`, { status: newStatus }, { withCredentials: true })
      .then(() => fetchBookings())
      .catch(err => {
        console.error(err);
        setError('Failed to update booking status');
      });
  };
         
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
      {error && <p className="text-red-500">{error}</p>}

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2">User</th>
              <th className="p-2">Provider</th>
              <th className="p-2">Service</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id} className="border-t">
                <td className="p-2">{booking.user?.name}</td>
                <td className="p-2">{booking.provider?.name}</td>
                <td className="p-2">{booking.service?.name}</td>
                <td className="p-2">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="p-2">{booking.timeSlot}</td>
                <td className="p-2">{booking.status}</td>
                <td className="p-2">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                    className="border rounded p-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
