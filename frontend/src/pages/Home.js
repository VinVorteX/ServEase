import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero-image.jpg';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white" style={{backgroundImage: `url(${heroImage})`, backgroundSize: 'cover'}}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">Find the Perfect Service Provider</h1>
            <p className="text-xl mb-8">Connect with trusted professionals for all your service needs</p>
            <Link
              to="/services"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ServeEase?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🔍"
              title="Easy to Find"
              description="Browse through verified service providers in your area"
            />
            <FeatureCard
              icon="⭐"
              title="Quality Service"
              description="Read reviews and choose the best professionals"
            />
            <FeatureCard
              icon="🔒"
              title="Secure Booking"
              description="Safe and secure payment processing"
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Step number="1" title="Search" description="Find the service you need" />
            <Step number="2" title="Compare" description="Read reviews and compare prices" />
            <Step number="3" title="Book" description="Schedule your service" />
            <Step number="4" title="Enjoy" description="Get the job done" />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center hover:transform hover:scale-105 transition duration-300">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const Step = ({ number, title, description }) => (
  <div className="text-center">
    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
      {number}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Home; 