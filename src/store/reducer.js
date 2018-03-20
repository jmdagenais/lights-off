import {RESTART_LEVEL, UNDO, UPDATE_GRID} from "./actions";
import {updateGridForIndex} from "../utility";

const initialGrid = [
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0,
  1, 0, 1, 0, 1,
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0
];

const initialState = {
  currentGrid: initialGrid.slice(),
  solution: [15, 17, 19, 20, 22, 24],
  initialGrid: initialGrid,
  clickPath: [],
  color: 'yellow',
  winning: false
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case UPDATE_GRID:
      return updateGrid(state, action);
    case UNDO:
      return undoLastMove(state);
    case RESTART_LEVEL:
      return restartLevel(state);
    default:
      return state;
  }
};

const updateGrid = (state, action) => {
  const updatedGrid = state.currentGrid.slice();
  const updatedClickPath = [...state.clickPath];
  let winning = false;

  action.payload.indexesToUpdate.forEach((index) => {
    updatedGrid[index] = !updatedGrid[index]
  });

  let index = action.payload.index;
  updatedClickPath.push(index);

  //check if the level is complete (does the user win the game?)
  let gridSum = updatedGrid.reduce((prev, next) => {
    return prev + next;
  }, 0);

  if (gridSum === 0) {
    winning = true;
  }

  return {
    ...state,
    currentGrid: updatedGrid,
    clickPath: updatedClickPath,
    winning: winning
  };
};

const undoLastMove = (state) => {
  let updatedClickPath = [...state.clickPath];
  let updatedGrid = [...state.currentGrid];

  const lastMove = updatedClickPath.pop();
  updatedGrid = updateGridForIndex(updatedGrid, lastMove);

  return {
    ...state,
    clickPath: updatedClickPath,
    currentGrid: updatedGrid
  }
};

const restartLevel = (state) => {
  return {
    ...state,
    clickPath: [],
    currentGrid: [...state.initialGrid]
  }
};

export default reducer;