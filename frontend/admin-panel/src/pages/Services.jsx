import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Services() {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  const fetchServices = () => {
    axios.get('http://localhost:5555/api/services', { withCredentials: true })
      .then(res => setServices(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to fetch services');
      });
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this service?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5555/api/admin/delete/${id}`, {
        withCredentials: true,
      });
      fetchServices(); // Refresh the list after deletion
    } catch (err) {
      console.error("Delete error:", err);
      setError('Failed to delete service');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Services</h1>
        <Link
          to="/add-service"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Service
        </Link>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {services.length === 0 ? (
        <p>No services found.</p>
      ) : (
        <ul className="space-y-3">
          {services.map(service => (
            <li
              key={service._id}
              className="border p-4 rounded flex justify-between items-start gap-2"
            >
              <div className="flex-1">
                <p><strong>Name:</strong> {service.name}</p>
                <p><strong>Description:</strong> {service.description}</p>
                <p><strong>Category:</strong> {service.category}</p>
                <p><strong>Price:</strong> ₹{service.price}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  to={`/edit-service/${service._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
