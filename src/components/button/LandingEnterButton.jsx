import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import './LandingEnterButton.css';

const LandingEnterButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div
      onClick={() => loginWithRedirect()}
      className="pacifico-regular-small enter-button"
      id="landing-enter-button-container"
    >
      Enter
    </div>
  );
};

export default LandingEnterButton;
