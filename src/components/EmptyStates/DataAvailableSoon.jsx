import React from 'react';
import { DataAvailableSoonGif } from '../../assets';

const DataAvailableSoon = ({ 
  title = "Available Soon", 
  message = "We're working hard to bring you this feature. Stay tuned!",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center w-full ${className}`}>
      <div className="mb-6">
        <img 
          src={DataAvailableSoonGif} 
          alt="Available Soon" 
          className="w-40 h-32 mx-auto object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 max-w-md">
        {message}
      </p>
    </div>
  );
};

export default DataAvailableSoon;