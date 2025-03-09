import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookings } from '../services/api';

const Profile = () => {
  const { user } = useAuth();
  const [userBookings, setUserBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await bookings.getUserBookings();
        setUserBookings(response.data);
      } catch (err) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        {userBookings.length === 0 ? (
          <p>No bookings found</p>
        ) : (
          <div className="space-y-4">
            {userBookings.map(booking => (
              <div key={booking.id} className="border-b pb-4">
                <p><strong>Service:</strong> {booking.service.name}</p>
                <p><strong>Provider:</strong> {booking.provider.name}</p>
                <p><strong>Date:</strong> {new Date(booking.date_time).toLocaleString()}</p>
                <p><strong>Status:</strong> {booking.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile; 