import React from 'react';

import './LandingHeader.css';
import { Constants } from '../../config';

const LandingHeader = () => {
  return <div className="pacifico-regular-header">{Constants.welcome}</div>;
};

export default LandingHeader;
