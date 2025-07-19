import { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/api/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error("Service fetch error:", err));

    axios
      .get("http://localhost:5555/api/reviews")
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Review fetch error:", err));
  }, []);

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToServices = () => {
    const serviceSection = document.getElementById("services");
    if (serviceSection) {
      serviceSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-24">
      <Navbar searchQuery={search} setSearchQuery={setSearch} />

     {/* Hero Section with Smaller Carousel */}
<div className="text-center py-6 px-4 bg-gradient-to-br from-blue-100 to-purple-100">
  <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-md h-60">
    <Carousel
      autoPlay
      infiniteLoop
      interval={6000}
      showThumbs={false}
      showStatus={false}
      showIndicators={true}
      transitionTime={1000}
    >
      <img
        src="https://res.cloudinary.com/urbanclap/image/upload/t_high_res_template,q_auto:low,f_auto/dpr_2,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1696852847761-574450.jpeg"
        alt="Urban Home Service"
        className="h-60 object-cover w-full"
      />
      <img
        src="https://www.capermint.com/wp-content/uploads/2020/07/Urban-Company-Service-Provider.jpg"
        alt="Urban Providers"
        className="h-60 object-cover w-full"
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQStWs8CF5EtSzdfo2xAiUYOhwe2NwhWMii8Q&usqp=CAU"
        alt="Urban Tools"
        className="h-60 object-cover w-full"
      />
    </Carousel>
  </div>

  <h1 className="text-2xl font-bold text-gray-800 mt-4">
    Home Services, On Demand
  </h1>
  <p className="text-md text-gray-600 mb-4">
    Trusted professionals at your doorstep
  </p>
  <button
    className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
    onClick={scrollToServices}
  >
    Book a Service
  </button>
</div>


      {/* Services */}
      <div id="services" className="py-10 px-6 max-w-6xl mx-auto flex-grow">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Available Services
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>

      {/* Reviews */}
      {reviews.length > 0 && (
        <div className="py-14 px-4 bg-white max-w-5xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-700">
            What Our Users Say
          </h2>
          <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            showThumbs={false}
            showStatus={false}
            showIndicators={true}
            className="rounded-md"
          >
            {reviews.map((rev) => (
              <div key={rev._id} className="bg-gray-100 p-6 mx-4 rounded-lg shadow-md">
                <p className="text-gray-800 text-lg italic mb-4">"{rev.comment}"</p>
                <div className="text-blue-600 font-semibold">{rev.user?.name}</div>
                <div className="text-sm text-gray-500">Service: {rev.service?.name}</div>
                <div className="text-yellow-500 text-lg mt-2">
                  {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Home;
