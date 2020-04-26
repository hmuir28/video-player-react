import React from 'react';

import StyledSpinner from '../styles/StyledSpinner';

const Spinner = () => (
  <StyledSpinner>
    <div className="preloader-wrapper big active">
      <div className="spinner-layer spinner-blue-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div><div className="gap-patch">
          <div className="circle"></div>
        </div><div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  </StyledSpinner>
);

export default Spinner;
