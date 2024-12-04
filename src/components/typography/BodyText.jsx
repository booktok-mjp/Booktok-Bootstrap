import React from 'react';
import { Colors } from '../../config';

const BodyText = ({ text }) => {
  return (
    <div
      style={{
        fontSize: '12pt',
        marginTop: '6px',
        color: Colors.battleshipGray,
        // marginLeft: '7px',
      }}
    >
      {text}
    </div>
  );
};

export default BodyText;
