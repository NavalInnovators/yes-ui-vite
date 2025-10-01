import React from 'react';
import { Loading, PageNotFound, AvailableSoon, FetchData, UploadingData } from '../assets';
import './LoadingStates.css';

// Loading State Component
export const LoadingState = ({ message = "Loading...", size = "medium" }) => {
  return (
    <div className={`loading-state loading-${size}`}>
      <div className="loading-backdrop"></div>
      <div className="loading-content">
        <img src={Loading} alt="Loading" className="loading-gif" />
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
};

// Error State Component
export const ErrorState = ({ message = "Something went wrong", size = "medium" }) => {
  return (
    <div className={`error-state error-${size}`}>
      <div className="error-backdrop"></div>
      <div className="error-content">
        <img src={PageNotFound} alt="Error" className="error-gif" />
        <p className="error-text">{message}</p>
      </div>
    </div>
  );
};

// Data Unavailable State Component
export const DataUnavailableState = ({ message = "Data will be available soon", size = "medium" }) => {
  return (
    <div className={`unavailable-state unavailable-${size}`}>
      <div className="unavailable-backdrop"></div>
      <div className="unavailable-content">
        <img src={AvailableSoon} alt="Coming Soon" className="unavailable-gif" />
        <p className="unavailable-text">{message}</p>
      </div>
    </div>
  );
};

// Fetching Data State Component
export const FetchingDataState = ({ message = "Fetching your data...", size = "medium" }) => {
  return (
    <div className={`fetching-state fetching-${size}`}>
      <div className="fetching-backdrop"></div>
      <div className="fetching-content">
        <img src={FetchData} alt="Fetching Data" className="fetching-gif" />
        <p className="fetching-text">{message}</p>
      </div>
    </div>
  );
};

// Uploading Data State Component
export const UploadingDataState = ({ message = "Uploading your data...", size = "medium" }) => {
  return (
    <div className={`uploading-state uploading-${size}`}>
      <div className="uploading-backdrop"></div>
      <div className="uploading-content">
        <img src={UploadingData} alt="Uploading Data" className="uploading-gif" />
        <p className="uploading-text">{message}</p>
      </div>
    </div>
  );
};

// Inline Loading State Component (no backdrop)
export const InlineLoadingState = ({ message = "Loading...", size = "medium" }) => {
  return (
    <div className={`inline-loading-state loading-${size}`}>
      <div className="inline-loading-content">
        <img src={Loading} alt="Loading" className="loading-gif" />
        <p className="loading-text">{message}</p>
      </div>
    </div>
  );
};

// Inline Error State Component (no backdrop)
export const InlineErrorState = ({ message = "Something went wrong", size = "medium" }) => {
  return (
    <div className={`inline-error-state error-${size}`}>
      <div className="inline-error-content">
        <img src={PageNotFound} alt="Error" className="error-gif" />
        <p className="error-text">{message}</p>
      </div>
    </div>
  );
};

// Inline Data Unavailable State Component (no backdrop)
export const InlineDataUnavailableState = ({ message = "Data will be available soon", size = "medium" }) => {
  return (
    <div className={`inline-unavailable-state unavailable-${size}`}>
      <div className="inline-unavailable-content">
        <img src={AvailableSoon} alt="Coming Soon" className="unavailable-gif" />
        <div className="unavailable-text">
          <div className="error-number">404</div>
          <div className="error-message">{message}</div>
        </div>
      </div>
    </div>
  );
};

// Special 404-style Error Component
export const Error404State = ({ message = "Something went wrong! Please try again later....", size = "medium" }) => {
  return (
    <div className={`inline-error-state error-${size}`}>
      <div className="inline-error-content">
        <img src={PageNotFound} alt="Error" className="error-gif" />
        <div className="error-text">
          <div className="error-number">404</div>
          <div className="error-message">{message}</div>
        </div>
      </div>
    </div>
  );
};

// Special Loading State Component
export const LoadingState404 = ({ message = "Loading...", size = "medium" }) => {
  return (
    <div className={`inline-loading-state loading-${size}`}>
      <div className="inline-loading-content">
        <img src={Loading} alt="Loading" className="loading-gif" />
        <div className="loading-text">
          <div className="loading-number">Loading</div>
          <div className="loading-message">{message}</div>
        </div>
      </div>
    </div>
  );
};

// Generic State Wrapper Component
export const StateWrapper = ({ 
  isLoading, 
  isError, 
  isEmpty, 
  isEmptyError = false,
  loadingMessage,
  errorMessage,
  emptyMessage,
  size = "medium",
  children 
}) => {
  if (isLoading) {
    return <LoadingState message={loadingMessage} size={size} />;
  }
  
  if (isError) {
    return <ErrorState message={errorMessage} size={size} />;
  }
  
  if (isEmpty) {
    return isEmptyError ? 
      <ErrorState message={emptyMessage} size={size} /> : 
      <DataUnavailableState message={emptyMessage} size={size} />;
  }
  
  return children;
};
