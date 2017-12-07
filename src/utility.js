export const getLevelStartFromSolution = (solution) => {
  let newGrid = [
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0
  ];
  
  solution.forEach(value => {
    newGrid = updateGridForIndex(newGrid, value);
  })
};

export const updateGridForIndex = (grid, index) => {
  let updatedGrid = grid.slice();
  const leftBorderIndexes = [0, 5, 10, 15, 20];
  const rightBorderIndexes = [4, 9, 14, 19, 24];
  let indexesToChange = [];
  if (leftBorderIndexes.indexOf(index) > -1) {
    //left border
    addSafeValue(indexesToChange, index);
    addSafeValue(indexesToChange, index + 1);
    addSafeValue(indexesToChange, index + 5);
    addSafeValue(indexesToChange, index - 5);
  } else if (rightBorderIndexes.indexOf(index) > -1) {
    //right border
    addSafeValue(indexesToChange, index);
    addSafeValue(indexesToChange, index - 1);
    addSafeValue(indexesToChange, index + 5);
    addSafeValue(indexesToChange, index - 5);
  } else {
    addSafeValue(indexesToChange, index);
    addSafeValue(indexesToChange, index - 1);
    addSafeValue(indexesToChange, index + 1);
    addSafeValue(indexesToChange, index - 5);
    addSafeValue(indexesToChange, index + 5);
  }

  indexesToChange.forEach((idx) => {
    updatedGrid[idx] = !updatedGrid[idx];
  });

  return updatedGrid;
};

const addSafeValue = (array, value) => {
  if (value >= 0 && value <= 24) {
    array.push(value);
  }
};