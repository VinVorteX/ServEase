import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-200 hover:scale-105">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{service.name}</h3>
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
            {service.category}
          </span>
        </div>
        <p className="text-gray-600 mb-4 h-20 overflow-hidden">
          {service.description}
        </p>
        <div className="flex justify-between items-center pt-4 border-t">
          <div>
            <span className="text-lg font-bold">${service.base_price}</span>
            <span className="text-gray-500 text-sm ml-1">per service</span>
          </div>
          <Link
            to={`/booking/${service.id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Book Now
          </Link>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Provider: {service.provider?.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 