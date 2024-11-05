import React from 'react';
import './CustomHeader.css';

const CustomHeader = ({ text, size = 'md', color = 'var(--navy-blue)' }) => {
  return (
    <span
      className={`custom-header ${size} pacifico-regular`}
      style={{ color }}
    >
      {text}
    </span>
  );
};

export default CustomHeader;
