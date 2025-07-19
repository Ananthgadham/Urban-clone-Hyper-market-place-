import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

// Pages
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Book from "./pages/Book";
import UserBookings from "./pages/UserBookings";
import BookingSuccess from "./pages/BookingSuccess";
import MyBookings from "./pages/MyBookings";  
import AuthCallback from "./pages/AuthCallback";
import MyProfile from "./pages/MyProfile";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/book" element={<Book />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/my-profile" element={<MyProfile/>} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
