import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-blue-600">ServeEase</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/services" active={isActive('/services')}>
              Services
            </NavLink>
            {user ? (
              <>
                <NavLink to="/profile" active={isActive('/profile')}>
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-blue-600 transition duration-200"
                >
                  Logout
                </button>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="font-medium">{user.name}</span>
                </div>
              </>
            ) : (
              <>
                <NavLink to="/login" active={isActive('/login')}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <MobileNavLink to="/services" onClick={() => setIsMenuOpen(false)}>
              Services
            </MobileNavLink>
            {user ? (
              <>
                <MobileNavLink to="/profile" onClick={() => setIsMenuOpen(false)}>
                  Profile
                </MobileNavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-600 hover:text-blue-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <MobileNavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </MobileNavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ to, children, active }) => (
  <Link
    to={to}
    className={`${
      active
        ? 'text-blue-600 font-semibold'
        : 'text-gray-600 hover:text-blue-600'
    } transition duration-200`}
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-2 text-gray-600 hover:text-blue-600"
  >
    {children}
  </Link>
);

export default Navbar; 