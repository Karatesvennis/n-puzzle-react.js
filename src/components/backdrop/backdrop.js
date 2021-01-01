import React from 'react';

import classes from './backdrop.module.css';

const backdrop = (props) => {
  const message = props.haveWon ? "Congratulations, you have solved the puzzle!" : "Welcome! Your aim is to align the squares in order (1-4, 5-8 etc..). Good Luck!";
  const btnText = props.haveWon ? "GO AGAIN" : "START GAME";
  return (
    <React.Fragment>
      <div className={classes.Backdrop}>
        <div className={classes.TextBox}>
          <p>{message}</p>
          <button onClick={props.clicked}>{btnText}</button>
        </div>
      </div>
    </React.Fragment>

  );
};


export default backdrop;