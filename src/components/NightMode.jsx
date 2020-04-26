import React from 'react';

import StyledNightMode from '../styles/StyledNightMode';

const NightMode = ({ nightModeCallback, nightMode }) => (
  <StyledNightMode>
    <span>Night mode: </span>
    <div className="switch">
      <label>
        <input type="checkbox" checked={nightMode} onChange={nightModeCallback} />
        <span className="lever" />
      </label>
    </div>
  </StyledNightMode>
);

export default NightMode;
