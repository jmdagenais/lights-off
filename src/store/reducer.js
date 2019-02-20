import {
  NEXT_LEVEL, PREVIOUS_LEVEL, RESTART_LEVEL, SAVE_SETTINGS, TOGGLE_SETTINGS, TOGGLE_SOLUTION, UNDO,
  UPDATE_GRID
} from "./actions";
import {updateGridForIndex} from "../utility";
import {LevelStore} from "../level-store";

const levelStore = new LevelStore();

const firstLevel = 1;

const initialGrid = levelStore.getLevelAt(firstLevel);
const initialSolution = levelStore.getSolutionAt(firstLevel);

const initialState = {
  currentGrid: initialGrid.slice(),
  solution: initialSolution,
  level: firstLevel,
  initialGrid: initialGrid,
  clickPath: [],
  color: 'yellow',
  winning: false,
  showSolution: false,
  showSettings: false,
  diagonalMode: false
};

const reducer = (state = initialState, action) => {

  switch(action.type) {
    case UPDATE_GRID:
      return updateGrid(state, action);
    case UNDO:
      return undoLastMove(state);
    case RESTART_LEVEL:
      return restartLevel(state);
    case NEXT_LEVEL:
      return nextLevel(state);
    case PREVIOUS_LEVEL:
      return previousLevel(state);
    case TOGGLE_SOLUTION:
      return {
        ...state,
        showSolution: !state.showSolution
      };
    case SAVE_SETTINGS:
      return {
        ...state,
        color: action.payload.color,
        showSettings: false
      };
    case TOGGLE_SETTINGS:
      return {
        ...state,
        showSettings: action.payload.visible
      };
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

  // update solution
  let newSol = [...state.solution];
  if (newSol.includes(index)) {
    newSol = newSol.filter((val) => {
      return val !== index;
    });
  } else {
    newSol.push(index);
  }
  // console.log(newSol);

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
    winning: winning,
    solution: newSol
  };
};

const undoLastMove = (state) => {
  let updatedClickPath = [...state.clickPath];
  let updatedGrid = [...state.currentGrid];

  const lastMove = updatedClickPath.pop();
  updatedGrid = updateGridForIndex(updatedGrid, lastMove);

  // test for solution
  let newSol = [...state.solution];
  if (newSol.includes(lastMove)) {
    newSol = newSol.filter((val) => {
      return val !== lastMove;
    });
  } else {
    newSol.push(lastMove);
  }
  console.log(newSol);
  // =================

  return {
    ...state,
    clickPath: updatedClickPath,
    currentGrid: updatedGrid,
    solution: newSol
  }
};

const restartLevel = (state) => {
  return {
    ...state,
    clickPath: [],
    currentGrid: [...state.initialGrid],
    solution: [...levelStore.getSolutionAt(state.level)],
    showSolution: false
  };
};

const changeLevel = (state, levelNumber) => {

  return {
    ...state,
    level: levelNumber,
    initialGrid: levelStore.getLevelAt(levelNumber),
    currentGrid: levelStore.getLevelAt(levelNumber),
    clickPath: [],
    winning: false,
    solution: [...levelStore.getSolutionAt(levelNumber)],
    showSolution: false
  };
};

const nextLevel = (state) => {
  let levelNumber = state.level + 1;
  if (levelNumber > levelStore.getNumberOfLevel()) {
    levelNumber = 1;
  }

  return changeLevel(state, levelNumber)
};

const previousLevel = (state) => {
  let levelNumber = state.level - 1;
  if (levelNumber === 0) {
    levelNumber = levelStore.getNumberOfLevel();
  }

  return changeLevel(state, levelNumber);
};

export default reducer;