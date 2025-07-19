import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddProvider() {
  const navigate = useNavigate();

  const [servicesList, setServicesList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: '',
    category: '',
    experience: '',
    skills: [],
    services: [],
    skillInput: ''
  });

  const [error, setError] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5555/api/services")
      .then(res => setServicesList(res.data))
      .catch(err => console.error("Failed to load services", err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && formData.skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(formData.skillInput.trim())) {
        setFormData(prev => ({
          ...prev,
          skills: [...prev.skills, prev.skillInput.trim()],
          skillInput: ''
        }));
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleServiceSelect = (e) => {
    const selectedId = e.target.value;
    if (!formData.services.includes(selectedId) && selectedId) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, selectedId]
      }));
    }
  };

  const removeService = (idToRemove) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter(id => id !== idToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = { ...formData };
    delete payload.skillInput;

    axios.post('http://localhost:5555/api/admin/add', payload, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    })
      .then(() => navigate('/providers'))
      .catch((err) => {
        console.error(err);
        setError('Failed to add provider');
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Provider</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Basic Inputs */}
        {["name", "email", "phone", "address", "location", "category", "experience"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleInputChange}
            className="border p-2 rounded w-full"
            required={["name", "email", "location", "category"].includes(field)}
          />
        ))}

        {/* Skills Input */}
        <div>
          <label className="block font-medium mb-1">Skills (press Enter to add)</label>
          <input
            type="text"
            name="skillInput"
            placeholder="Enter skill and press Enter"
            value={formData.skillInput}
            onChange={handleInputChange}
            onKeyDown={handleSkillKeyDown}
            className="border p-2 rounded w-full mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Multi-Select Services */}
        <div>
          <label className="block font-medium mb-1">Select Services</label>
          <select
            onChange={handleServiceSelect}
            className="border p-2 rounded w-full mb-2"
            value=""
          >
            <option value="">-- Select a service --</option>
            {servicesList.map(service => (
              <option key={service._id} value={service._id}>
                {service.name}
              </option>
            ))}
          </select>

          <div className="flex flex-wrap gap-2">
            {formData.services.map(serviceId => {
              const service = servicesList.find(s => s._id === serviceId);
              return (
                <span
                  key={serviceId}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                >
                  {service?.name}
                  <button
                    type="button"
                    onClick={() => removeService(serviceId)}
                    className="text-red-500 font-bold"
                  >
                    ×
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Provider
        </button>
      </form>
    </div>
  );
}
