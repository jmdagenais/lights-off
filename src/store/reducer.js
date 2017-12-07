import {RESTART_LEVEL, SHOW_SOLUTION, UNDO, UPDATE_GRID} from "./actions";
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
  initialSolution: [15, 17, 19, 20, 22, 24],
  clickPath: [],
  color: 'yellow',
  showSolution: false
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case UPDATE_GRID:
      return updateGrid(state, action);
    case UNDO:
      return undoLastMove(state);
    case RESTART_LEVEL:
      return restartLevel(state);
    case SHOW_SOLUTION:
      return {
        ...state,
        showSolution: true
      };
    default:
      return state;
  }
};

const updateGrid = (state, action) => {
  const updatedGrid = state.currentGrid.slice();
  const updatedClickPath = [...state.clickPath];
  let updatedSolution = [...state.solution];

  action.payload.indexesToUpdate.forEach((index) => {
    updatedGrid[index] = !updatedGrid[index]
  });

  let index = action.payload.index;
  updatedClickPath.push(index);

  // update solution
  if(updatedSolution.indexOf(index) === -1) {
    updatedSolution.push(index);
  } else {
    // remove index from updatedSolution
    updatedSolution = updatedSolution.filter((value) => {
      return value !== index;
    })
  }

  return {
    ...state,
    currentGrid: updatedGrid,
    clickPath: updatedClickPath,
    solution: updatedSolution
  };
};

const undoLastMove = (state) => {
  let updatedClickPath = [...state.clickPath];
  let updatedGrid = [...state.currentGrid];
  let updatedSolution = [...state.solution];

  const lastMove = updatedClickPath.pop();
  updatedGrid = updateGridForIndex(updatedGrid, lastMove);

  if(updatedSolution.indexOf(lastMove) === -1) {
    updatedSolution.push(lastMove);
  } else {
    // remove lastMove from updatedSolution
    updatedSolution = updatedSolution.filter((value) => {
      return value !== lastMove;
    })
  }

  return {
    ...state,
    clickPath: updatedClickPath,
    currentGrid: updatedGrid,
    solution: updatedSolution
  }
};

const restartLevel = (state) => {
  return {
    ...state,
    clickPath: [],
    currentGrid: [...state.initialGrid],
    solution: [...state.initialSolution],
    showSolution: false
  }
};

export default reducer;