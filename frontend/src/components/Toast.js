import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const Toast = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <FaCheckCircle className="w-5 h-5" />,
    error: <FaTimesCircle className="w-5 h-5" />,
    info: <FaInfoCircle className="w-5 h-5" />
  };

  const colors = {
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200'
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`flex items-center p-4 rounded-lg shadow-lg border ${colors[type]}`}>
        <div className="flex-shrink-0 mr-3">
          {icons[type]}
        </div>
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default Toast; 