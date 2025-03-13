import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600"></div>
        <div className="absolute top-4 right-4">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow">
            ${service.base_price}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              {service.category}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <FaMapMarkerAlt className="mr-2" />
          <span>Available in your area</span>
        </div>
        
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {service.provider?.name?.[0]?.toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{service.provider?.name}</p>
              <div className="flex items-center">
                <FaStar className="text-yellow-400 w-4 h-4" />
                <span className="text-sm text-gray-500 ml-1">4.8 (120)</span>
              </div>
            </div>
          </div>
          <Link
            to={`/booking/${service.id}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <FaClock className="mr-2" />
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard; 