export const UPDATE_GRID = 'UPDATE_GRID';
export const UNDO = 'UNDO';
export const RESTART_LEVEL = 'RESTART_LEVEL';
export const NEXT_LEVEL = 'NEXT_LEVEL';
export const PREVIOUS_LEVEL = 'PREVIOUS_LEVEL';
export const TOGGLE_SOLUTION = 'TOGGLE_SOLUTION';
export const SAVE_SETTINGS = 'SAVE_SETTINGS';

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

export function nextLevel() {
  return {
    type: NEXT_LEVEL
  };
}

export function previousLevel() {
  return {
    type: PREVIOUS_LEVEL
  };
}

export function toggleSolution() {
  return {
    type: TOGGLE_SOLUTION
  };
}

export function saveSettings(color, gameMode) {
  return {
    type: SAVE_SETTINGS,
    payload: {
      color,
      mode: gameMode
    }
  };
}