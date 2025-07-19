import { useEffect, useState } from "react";
import axios from "axios";

function MyProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5555/api/users/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(err => console.error("Error fetching profile", err));
  }, []);

  if (!user) {
    return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">👤 My Profile</h2>
      <div className="space-y-3 text-gray-700">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        {user.location && <p><strong>Location:</strong> {user.location}</p>}
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}

export default MyProfile;
