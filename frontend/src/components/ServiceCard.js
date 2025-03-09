import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate(`/booking/${service.id}`);
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-xl font-semibold">{service.name}</h3>
      <p className="text-gray-600 mt-2">{service.description}</p>
      <div className="mt-4">
        <p className="font-bold">${service.base_price}</p>
        <p className="text-sm text-gray-500">Provider: {service.provider.name}</p>
      </div>
      <button
        onClick={handleBooking}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Book Now
      </button>
    </div>
  );
}

export default ServiceCard; 