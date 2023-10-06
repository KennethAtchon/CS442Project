import React from 'react';
import './loadingSpinner.css'

const LoadingSpinner = ({ viewport }) => {
  return (
    <div className="loading-spinner" style={{ height: viewport }}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
