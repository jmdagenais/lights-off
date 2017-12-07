import React from 'react';

import './box.css';

const box = (props) => {
  let solutionIndicator = null;
  if (props.inSolution && props.showSolution) {
    solutionIndicator = <div className="solutionIndicator" />;
  }
  return <div
    className="box"
    style={{backgroundColor: props.color}}
    onClick={props.clicked}>
      {solutionIndicator}
  </div>
};

export default box;