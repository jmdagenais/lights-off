import React from 'react';

import './box.css';

const box = (props) => {
  return <div
    className="box"
    style={{backgroundColor: props.color}}
    onClick={props.clicked}>
  </div>
};

export default box;