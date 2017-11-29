import React from 'react';

import './box.css';

const box = (props) => {
    let classes = 'box ' + props.color;
    return <div className={classes} onClick={props.clicked}></div>
};

export default box;