import React from 'react';
import './Divider.css';

const Divider = ({
  thickness = '1px',
  color = '#ccc',
  margin = '0 20px',
  height = '100px',
  orientation = 'horizontal',
  marginBottom,
}) => {
  return (
    <div
      className={`custom-divider ${orientation}`}
      style={{
        borderLeft:
          orientation === 'vertical' ? `${thickness} solid ${color}` : 'none',
        borderBottom:
          orientation === 'horizontal' ? `${thickness} solid ${color}` : 'none',
        height: orientation === 'vertical' ? height : 'auto',
        width: orientation === 'vertical' ? 'auto' : '80%',
        margin: 'auto',
        marginBottom: marginBottom,
      }}
    />
  );
};

export default Divider;
