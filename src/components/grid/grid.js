import React, { Component } from 'react';

import classes from './grid.module.css';
import Cell from './cell/cell';
import Backdrop from '../backdrop/backdrop';

// const CORRECT_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

class Grid extends Component {

  numberOfRows = 4;

  state = {
    rows: [],
    activeRow: null,
    activeIndex: null,
    isPlaying: false,
    isGameWon: false
  };

  randomizeGrid = (grid) => {
    let tempGrid = [...grid];
    tempGrid = this.destructureNestedArrays(tempGrid);
    this.shuffle(tempGrid);
    tempGrid = this.createRowsAndCols(tempGrid);
    return tempGrid;
  };

  shuffle = (grid) => {
    for (let i = grid.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = grid[i];
      grid[i] = grid[j];
      grid[j] = temp;
    }
  };

  destructureNestedArrays = (arr) => {
    const newArr = [];
    arr.forEach(element => {
      element.forEach(nestedElement => {
        newArr.push(nestedElement);
      });
    });
    return newArr;
  };

  createRowsAndCols = (grid) => {
    let gridCopy = [...grid];
    let tempGrid = [];
    for (let i = 0; i < this.numberOfRows; i++) {
      tempGrid.push([]);
      for (let j = 0; j < this.numberOfRows; j++) {
        tempGrid[i].push(gridCopy.shift());
      };
    }
    return tempGrid;
  };

  createGrid = () => {
    let newGrid = [];
    let num = 0;
    let activeRow = null;
    let activeIndex = null;
    for (let i = 0; i < this.numberOfRows; i++) {
      const row = [];
      for (let j = 0; j < this.numberOfRows; j++) {
        const cell = {
          number: num + 1,
          hide: false,
          clickable: false
        };
        row.push(cell);
        num++;
      }
      newGrid.push(row);
    }

    newGrid = this.randomizeGrid(newGrid);

    newGrid.forEach(row => {
      row.forEach(cell => {
        if (cell.number === this.numberOfRows * 2) {
          cell.hide = true;
          activeIndex = row.indexOf(cell);
          activeRow = newGrid.indexOf(row);
        }
      });
    });

    this.clickableHandler(newGrid, activeRow, activeIndex);


    this.setState({
      rows: newGrid,
      activeRow: activeRow,
      activeIndex: activeIndex,
      isPlaying: true,
      isGameWon: false
    });
  };

  checkWinningCondition = (gridArr) => {
    let index = 1;
    gridArr.forEach(row => {
      row.forEach(cell => {
        if (cell.number !== index) return;
        else if (index === this.numberOfRows * 2) {
          this.setState({ isPlaying: false, gameWon: true });
        }
        index++;
      });
    });
  };

  clickableHandler = (grid, activeRow, activeIndex) => {

    grid.forEach(row => {
      row.forEach(cell => {
        cell.clickable = false;
      });
    });

    // Check above
    if (activeRow > 0) {
      grid[activeRow - 1][activeIndex].clickable = true;
    }

    // Check below
    if (activeRow < this.numberOfRows - 1) {
      grid[activeRow + 1][activeIndex].clickable = true;
    }

    // Check right
    if (activeIndex < this.numberOfRows - 1) {
      grid[activeRow][activeIndex + 1].clickable = true;
    }

    // Check left
    if (activeIndex > 0) {
      grid[activeRow][activeIndex - 1].clickable = true;
    }
  };

  clickHandler = (rowIndex, cellIndex) => {

    if (!this.state.rows[rowIndex][cellIndex].clickable) return;

    let grid = [...this.state.rows];

    const clickedCell = grid[rowIndex][cellIndex];
    const activeCell = grid[this.state.activeRow][this.state.activeIndex];

    grid[rowIndex].splice(cellIndex, 1);
    grid[rowIndex].splice(cellIndex, 0, activeCell);

    grid[this.state.activeRow].splice(this.state.activeIndex, 1);
    grid[this.state.activeRow].splice(this.state.activeIndex, 0, clickedCell);


    this.clickableHandler(grid, rowIndex, cellIndex);

    this.setState({ rows: grid, activeRow: rowIndex, activeIndex: cellIndex });

    this.checkWinningCondition(grid);
  };

  toggleBackdrop = (isPlaying, isGameWon) => {
    if (isPlaying) return null;
    return <Backdrop haveWon={isGameWon} clicked={this.createGrid} />;
  };

  render() {

    const grid = this.state.rows.map((row, rowIndex) => {
      return (<div className={classes.Row} key={rowIndex}>{row.map(
        (cell, cellIndex) => {
          return (<Cell
            rowIndex={rowIndex}
            cellIndex={cellIndex}
            key={cell.number}
            number={cell.number}
            hidden={cell.hide}
            isClickable={cell.clickable}
            clickFunc={this.clickHandler}
          />);
        }
      )}</div>);
    });

    const backdrop = this.toggleBackdrop(this.state.isPlaying, this.state.isGameWon);

    return (
      <React.Fragment>
        {backdrop}
        <div className={classes.Rows}>
          {grid}
        </div>
      </React.Fragment>
    );
  }
}

export default Grid;