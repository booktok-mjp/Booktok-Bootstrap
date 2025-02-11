import React from 'react';
import { Spinner } from 'react-bootstrap';

import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div data-testid="loading-spinner" className="spinner-container">
      <Spinner animation="border" variant="secondary" />
    </div>
  );
};

export default LoadingSpinner;
