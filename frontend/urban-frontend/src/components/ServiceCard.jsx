import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// 👇 You can also place your own image in /public if needed
const DEFAULT_IMAGE = "https://dummyimage.com/300x200/cccccc/000000.png&text=No+Image";

function ServiceCard({ service }) {
  const { cart, setCart } = useContext(CartContext);

  const handleAddToCart = () => {
    const alreadyInCart = cart.some((item) => item._id === service._id);
    if (!alreadyInCart) {
      const updatedCart = [...cart, service];
      setCart(updatedCart);
    }
  };

  const handleBookNow = () => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    window.location.href = "/book";
  };
const imageUrl = service.imageUrl
  ? `http://localhost:5555${service.imageUrl}`
  : DEFAULT_IMAGE;
   
  return (
    <div className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition">
      <img
        src={imageUrl}
        alt={service.name}
        className="w-full h-32 object-cover rounded"
        onError={(e) => (e.target.src = DEFAULT_IMAGE)} // Fallback if image fails
      />
      <h3 className="text-lg font-semibold mt-2">{service.name}</h3>
      <p className="text-sm text-gray-600">{service.description}</p>
      <p className="text-blue-600 font-bold mt-1">₹{service.price}</p>

      <div className="flex gap-2 mt-3">
        <button
          onClick={handleBookNow}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Book Now
        </button>
        <button
          onClick={handleAddToCart}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
