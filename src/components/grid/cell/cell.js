import React from 'react';

import classes from './cell.module.css';

const cell = props => {

  const hiddenClass = props.hidden ? classes.empty : "";
  const clickableClass = props.isClickable ? classes.clickable : "";

  return (
    <div className={`${classes.cell} ${hiddenClass} ${clickableClass}`} onClick={() => props.clickFunc(props.rowIndex, props.cellIndex)}>
      <p><strong>{props.number}</strong></p>
    </div>
  );
};

export default cell;