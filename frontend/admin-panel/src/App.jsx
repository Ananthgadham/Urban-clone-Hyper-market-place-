// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Providers from './pages/Providers';
import Services from './pages/Services';
import AddService from './pages/AddService';
import Login from './pages/Login';
import EditService from './pages/EditService'; // 👈 import it
import Bookings from './pages/Bookings';
import AdminReviews from './pages/AdminReviews';  
import AddProvider from './pages/AddProvider';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
        <Route path="/providers" element={<Providers />} />
      <Route path="/users" element={<Users />} />
       <Route path="/providers" element={<Providers />} />
      <Route path="/services" element={<Services />} />
      <Route path="/add-service" element={<AddService />} />
      <Route path="/bookings" element={<Bookings />} />
       <Route path="/providers/add" element={<AddProvider />} />
       <Route path="/edit-service/:id" element={<EditService />} /> 
         <Route path="/login" element={<Login />} />
         <Route path="/admin-reviews" element={<AdminReviews/>} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
