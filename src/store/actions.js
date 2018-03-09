export const UPDATE_GRID = 'UPDATE_GRID';
export const UNDO = 'UNDO';
export const RESTART_LEVEL = 'RESTART_LEVEL';

export function updateGrid(index, indexesToUpdate) {
  return {
    type: UPDATE_GRID,
    payload: {
      index,
      indexesToUpdate
    }
  }
}

export function undo() {
  return {
    type: UNDO
  };
}

export function restartLevel() {
  return {
    type: RESTART_LEVEL
  };
}
