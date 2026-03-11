import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Correct backend URL
const API = "https://urban-backend-hiv3.onrender.com";

// ✅ Always send cookies
axios.defaults.withCredentials = true;

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Check if already logged in
  useEffect(() => {
    axios
      .get(`${API}/api/auth/me`)
      .then(() => {
        navigate("/dashboard");
      })
      .catch(() => {});
  }, [navigate]);

  // ✅ Handle input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Manual login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API}/api/auth/login`, form);

      setSuccessMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Login failed");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  // ✅ Google login
  const handleGoogleLogin = () => {
    window.location.href = `${API}/api/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <div className="bg-white bg-opacity-70 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md">

        <div className="text-center mb-6">
          <img
            src="https://seeklogo.com/images/U/urban-company-logo-A99D1E722A-seeklogo.com.png"
            alt="Urban Company Logo"
            className="mx-auto w-16 h-16"
          />
          <h2 className="text-2xl font-bold mt-4 text-gray-700">
            User Login
          </h2>
        </div>

        {successMessage && (
          <div className="bg-green-200 text-black p-3 rounded-md mb-4 text-center border border-green-400">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="bg-red-200 text-black p-3 rounded-md mb-4 text-center border border-red-400">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
          >
            Login
          </button>

        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow" />
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-red-500 text-white py-3 rounded-md hover:bg-red-600"
        >
          Continue with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;