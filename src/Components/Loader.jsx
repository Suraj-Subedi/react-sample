import React from 'react';
import './Components.css';

const Loader = ({ mode = '' }) => {
  return (
    <div
      className={`${mode == 'fullscreen' ? 'unique-topschool-loader-wrapper fullscreen' : 'unique-topschool-loader-wrapper'}`}
    >
      <div className="unique-topschool-loader">
        <div className="unique-topschool-spinner"></div>
        <p className="unique-topschool-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
