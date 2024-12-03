import React from 'react';
import { Alert } from 'react-bootstrap';

const CustomAlert = ({ variant, heading, body, setShowAlert }) => {
  return (
    <Alert
      show
      variant={variant}
      dismissible
      onClose={() => setShowAlert(false)}
      style={{ zIndex: 10, position: 'sticky', bottom: '10px' }}
    >
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{body}</p>
    </Alert>
  );
};

export default CustomAlert;
