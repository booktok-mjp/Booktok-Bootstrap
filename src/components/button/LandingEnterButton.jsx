import { useAuth0 } from '@auth0/auth0-react';

import './LandingEnterButton.css';

const LandingEnterButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className="enter-button">
      Enter
    </button>
  );
};

export default LandingEnterButton;
