import { Constants } from '../../config';

import './LandingHeader.css';

const LandingHeader = () => {
  return <h1 className="landing-header">{Constants.welcome}</h1>;
};

export default LandingHeader;
