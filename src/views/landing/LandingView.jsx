import LandingEnterButton from '../../components/button/LandingEnterButton';
import LandingHeader from '../../components/header/LandingHeader';

import './LandingView.css';

const LandingView = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100 landing-page">
      <LandingHeader />
      <LandingEnterButton />
    </div>
  );
};

export default LandingView;
