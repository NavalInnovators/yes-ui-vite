import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageNotFoundGif } from '../../assets';

const PageNotFound = ({ 
  title = "Page Not Found", 
  message = "The page you're looking for doesn't exist or has been moved.",
  showBackButton = true,
  className = ""
}) => {
  const navigate = useNavigate();

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center w-full ${className}`}>
      <div className="mb-6">
        <img 
          src={PageNotFoundGif} 
          alt="Page Not Found" 
          className="w-40 h-32 mx-auto object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 max-w-md mb-6">
        {message}
      </p>
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Go Back
        </button>
      )}
    </div>
  );
};

export default PageNotFound;