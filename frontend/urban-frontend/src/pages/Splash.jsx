// src/pages/Splash.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setTimeout(() => {
      if (token) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }, 2000);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50">
      <div className="text-center animate-fade-in">
        <div className="flex justify-center items-center mb-6">
          <img
            src="https://seeklogo.com/images/U/urban-company-logo-D1914D6C38-seeklogo.com.png"
            alt="Urban Company"
            className="w-28 h-28 md:w-32 md:h-32 animate-pulse shadow-xl rounded-full"
          />
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-wide">
          Urban Company Clone
        </h1>
        <p className="text-md md:text-lg mt-3 text-gray-600 font-medium">
          India’s #1 Home Services Platform
        </p>
      </div>
    </div>
  );
}

export default Splash;
