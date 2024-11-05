import React from 'react';
import { IconContext } from 'react-icons';

import './IconButton.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const ReactIconButton = ({
  icon: Icon,
  onClick,
  size = 'sm',
  color = 'white',
  bgColor = 'var(--wine-red)',
  tooltipText,
}) => {
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );
  return (
    <OverlayTrigger placement="right" overlay={renderTooltip}>
      <button
        onClick={onClick}
        className={`icon-btn ${size}`}
        style={{ backgroundColor: bgColor, color: color }}
      >
        <IconContext.Provider value={{ size: size === 'sm' ? '20px' : '30px' }}>
          {Icon}
        </IconContext.Provider>
      </button>
    </OverlayTrigger>
  );
};

export default ReactIconButton;
