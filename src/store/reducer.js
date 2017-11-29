import {UPDATE_GRID} from "./actions";

const initialState = {
  currentGrid: [0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                1, 0, 1, 0, 1,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0],
  solution: [15, 17, 19, 20, 22, 24]
};

const reducer = (state = initialState, action) => {
  if (action.type === UPDATE_GRID) {
    const newGrid = state.currentGrid.slice();
    action.payload.indexesToUpdate.forEach((index) => {
      newGrid[index] = !newGrid[index]
    });
    return {
      ...state,
      currentGrid: newGrid
    };
  }
  return state;
};

export default reducer;