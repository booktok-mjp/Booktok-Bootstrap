import LandingEnterButton from '../../components/button/LandingEnterButton';
import CustomHeader from '../../components/header/CustomHeader';
import LandingHeader from '../../components/header/LandingHeader';
import { Colors, Constants } from '../../config';

import './LandingView.css';

const LandingView = () => {
  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="content">
          <LandingHeader />
          <CustomHeader
            color={Colors.ivory}
            text={Constants.tagline2}
            size="lg"
          />
          <LandingEnterButton />
        </div>
      </div>
    </div>
  );
};

export default LandingView;
