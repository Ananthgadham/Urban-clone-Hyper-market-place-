// src/pages/Providers.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');

  const fetchProviders = () => {
    axios.get('http://localhost:5555/api/admin/providers', { withCredentials: true })
      .then((res) => setProviders(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch providers');
      });
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleDeleteProvider = (id) => {
    axios.delete(`http://localhost:5555/api/admin/providers/${id}`, { withCredentials: true })
      .then(() => fetchProviders())
      .catch((err) => {
        console.error(err);
        setError('Failed to delete provider');
      });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Providers</h1>
        <Link to="/providers/add" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          + Add Provider
        </Link>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {providers.length === 0 ? (
        <p>No providers found.</p>
      ) : (
        <ul className="space-y-2">
          {providers.map((provider) => (
            <li key={provider._id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p><strong>Name:</strong> {provider.name}</p>
                <p><strong>Email:</strong> {provider.email}</p>
                <p><strong>Phone:</strong> {provider.phone}</p>
                <p><strong>Location:</strong> {provider.location}</p>
                <p><strong>Category:</strong> {provider.category}</p>
              </div>
              <button onClick={() => handleDeleteProvider(provider._id)} className="bg-red-600 text-white px-3 py-1 rounded">Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
