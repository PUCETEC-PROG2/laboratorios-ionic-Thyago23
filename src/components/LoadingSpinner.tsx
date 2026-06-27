import React from 'react';
import { IonSpinner } from '@ionic/react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <IonSpinner className="loading-spinner" />
    </div>
  );
};

export default LoadingSpinner;
