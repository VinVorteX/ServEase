import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services, bookings } from '../services/api';

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await services.getAll();
        const foundService = response.data.find(s => s.id === parseInt(serviceId));
        if (foundService) {
          setService(foundService);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        setError('Failed to fetch service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookings.create({
        service_id: parseInt(serviceId),
        provider_id: service.provider_id,
        date_time: dateTime
      });
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create booking');
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;
  if (!service) return <div className="text-center mt-10">Service not found</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h2 className="text-2xl font-bold mb-6">Book Service</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold">{service.name}</h3>
        <p className="text-gray-600">{service.description}</p>
        <p className="text-lg font-semibold mt-2">Price: ${service.base_price}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Select Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingPage; 