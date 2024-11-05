import React from 'react';
import { Button } from 'react-bootstrap';
import './CustomButton.css';

const CustomButton = ({
  disabled = false,
  onClick,
  type = 'button',
  text,
  variant,
  size = 'lg',
}) => {
  return (
    <Button
      className={`btn-container ${size} btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
