export const UPDATE_GRID = 'UPDATE_GRID';

export function updateGrid(index, indexesToUpdate) {
  return {
    type: UPDATE_GRID,
    payload: {
      index,
      indexesToUpdate
    }
  }
}