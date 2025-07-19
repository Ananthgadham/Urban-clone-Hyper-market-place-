// import { useContext, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../context/CartContext";
// import { FaUserCircle } from "react-icons/fa";

// function Navbar({ searchQuery, setSearchQuery }) {
//   const navigate = useNavigate();
//   const { cart } = useContext(CartContext);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-white shadow flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
//       {/* Logo */}
//       <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
//         <img
//           src="https://seeklogo.com/images/U/urban-company-logo-A99D1E722A-seeklogo.com.png"
//           alt="Urban Logo"
//           className="w-15 h-10"
//         />
//         <span className="text-xl font-semibold text-gray-800">Urban Company</span>
//       </div>

//       {/* Search Inputs */}
//       <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
//         <input
//           type="text"
//           placeholder="Search location"
//           className="p-2 border rounded-md w-full md:w-40"
//         />
//         <input
//           type="text"
//           placeholder="Search services"
//           className="p-2 border rounded-md w-full md:w-40"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Cart & Profile */}
//       <div className="flex items-center gap-4 relative">
//         {/* Cart */}
//         <div
//           onClick={() => navigate("/cart")}
//           className="relative cursor-pointer text-xl"
//           title="Cart"
//         >
//           🛒
//           {cart.length > 0 && (
//             <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
//               {cart.length}
//             </span>
//           )}
//         </div>

//         {/* Profile Dropdown */}
//         <div className="relative">
//           <FaUserCircle
//             className="text-2xl text-gray-700 cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           />
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-md z-20">
//               <button
//                 onClick={() => {
//                   setDropdownOpen(false);
//                   navigate("/my-bookings");
//                 }}
//                 className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
//               >
//                 My Bookings
//               </button>
//               <button
//                 onClick={() => {
//                   setDropdownOpen(false);
//                   navigate("/my-profile");
//                 }}
//                 className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
//               >
//                 My Profile
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full px-4 py-2 text-sm text-left hover:bg-red-100 text-red-600"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;


import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
function Navbar({ searchQuery, setSearchQuery }) {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5555/api/auth/logout", {}, { withCredentials: true });
      localStorage.clear(); // optional: clear any local storage data
      navigate("/login");
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src="https://seeklogo.com/images/U/urban-company-logo-A99D1E722A-seeklogo.com.png"
          alt="Urban Logo"
          className="w-15 h-10"
        />
        <span className="text-xl font-semibold text-gray-800">Urban Company</span>
      </div>

      {/* Search Inputs */}
      <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search location"
          className="p-2 border rounded-md w-full md:w-40"
        />
        <input
          type="text"
          placeholder="Search services"
          className="p-2 border rounded-md w-full md:w-40"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Cart & Profile */}
      <div className="flex items-center gap-4 relative">
        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer text-xl"
          title="Cart"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
              {cart.length}
            </span>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <FaUserCircle
            className="text-2xl text-gray-700 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded shadow-md z-20">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/my-bookings");
                }}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                My Bookings
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/my-profile");
                }}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-sm text-left hover:bg-red-100 text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
