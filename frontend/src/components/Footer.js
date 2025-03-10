import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ServeEase</h3>
            <p className="text-gray-400">
              Your trusted platform for finding and booking professional services.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/cleaning" className="text-gray-400 hover:text-white">
                  Cleaning
                </Link>
              </li>
              <li>
                <Link to="/services/plumbing" className="text-gray-400 hover:text-white">
                  Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services/electrical" className="text-gray-400 hover:text-white">
                  Electrical
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@servease.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Address: 123 Service St, City</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ServeEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 