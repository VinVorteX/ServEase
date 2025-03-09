import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to ServeEase</h1>
        <p className="text-xl mb-8">Your one-stop marketplace for home services</p>
        <Link
          to="/services"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Browse Services
        </Link>
      </div>
    </div>
  );
};

export default Home; 