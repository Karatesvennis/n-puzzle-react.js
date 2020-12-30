import React from 'react';

import classes from './container.module.css';

import Grid from '../grid/grid';

const container = props => {
  return (
    <div className={classes.container}>
      <Grid />
    </div>
  );
};

export default container;