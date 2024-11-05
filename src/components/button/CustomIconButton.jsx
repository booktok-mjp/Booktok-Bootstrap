import React from 'react';

import './CustomIconButton.css';

const CustomIconButton = ({ src, onClick, size, bgColor, color }) => {
  return (
    <div
      onClick={onClick}
      className={`icon-container ${size}`}
      style={{ backgroundColor: bgColor, color: color }}
    >
      <img className="icon-img" src={src} width="40px" />
    </div>
  );
};

export default CustomIconButton;
