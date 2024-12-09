import LandingEnterButton from '../../components/button/LandingEnterButton';
import CustomHeader from '../../components/header/CustomHeader';
import LandingHeader from '../../components/header/LandingHeader';
import { Constants } from '../../config';

import './LandingView.css';

const LandingView = () => {
  return (
    <div className="landing-page">
      <LandingHeader />
      <LandingEnterButton />
      <div className="mt-4">
        <CustomHeader text={Constants.tagline2} />
      </div>
    </div>
  );
};

export default LandingView;
