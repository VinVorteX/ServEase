import React, { useState, useEffect } from 'react';
import { services } from '../services/api';
import ServiceCard from '../components/ServiceCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Services = () => {
  const [serviceList, setServiceList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState({ category: '', minPrice: '', maxPrice: '' });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await services.getAll();
      setServiceList(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch services');
      console.error('Error fetching services:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = serviceList.filter(service => {
    return (
      (!filter.category || service.category === filter.category) &&
      (!filter.minPrice || service.base_price >= Number(filter.minPrice)) &&
      (!filter.maxPrice || service.base_price <= Number(filter.maxPrice))
    );
  });

  const categories = [...new Set(serviceList.map(service => service.category))];

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="text-center mt-10">
      <div className="text-red-500 mb-4">{error}</div>
      <button 
        onClick={fetchServices}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Services</h1>
      
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Min Price</label>
            <input
              type="number"
              value={filter.minPrice}
              onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Min Price"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Max Price</label>
            <input
              type="number"
              value={filter.maxPrice}
              onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Max Price"
            />
          </div>
        </div>
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No services found matching your criteria</p>
          {Object.values(filter).some(Boolean) && (
            <button
              onClick={() => setFilter({ category: '', minPrice: '', maxPrice: '' })}
              className="mt-4 text-blue-500 hover:text-blue-600"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services; 