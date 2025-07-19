import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    duration: '',
    image: null, // for new uploaded image
  });

  const [error, setError] = useState('');

  // Fetch existing service
  useEffect(() => {
    axios
      .get(`http://localhost:5555/api/services/${id}`, { withCredentials: true })
      .then((res) => {
        const { name, description, price, category, duration } = res.data;
        setFormData((prev) => ({
          ...prev,
          name,
          description,
          price,
          category,
          duration,
        }));
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to load service');
      });
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // Submit updated data
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('duration', formData.duration);

    if (formData.image) {
      data.append('image', formData.image);
    }

    axios
      .put(`http://localhost:5555/api/admin/edit/${id}`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        navigate('/services');
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to update service');
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Service</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Service Name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="duration"
          value={formData.duration}
          onChange={handleInputChange}
          placeholder="Duration"
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="border p-2 w-full rounded"
          accept="image/*"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Service
        </button>
      </form>
    </div>
  );
}
