// src/pages/Users.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = () => {
    axios
      .get('http://localhost:5555/api/admin/users', { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch users');
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:5555/api/admin/users/${id}`, {
        withCredentials: true,
      });
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete user');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Users</h1>
      {error && <p className="text-red-500">{error}</p>}

      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user._id} className="border p-4 rounded shadow-sm">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <button
                onClick={() => handleDelete(user._id)}
                className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete User
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
