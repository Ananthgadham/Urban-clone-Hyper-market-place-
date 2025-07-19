// src/pages/AuthCallback.jsx
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/auth/me", { withCredentials: true })
      .then((res) => {
        // ✅ User session exists
        navigate("/dashboard");
      })
      .catch(() => {
        // ❌ Not logged in
        navigate("/login");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center text-lg font-semibold text-gray-700">
      Logging you in...
    </div>
  );
}

export default AuthCallback;
