import {getLevelStartFromSolution} from "./utility";

export class LevelStore {
  currentLevel = 0;

  levelSolutions = [
    [15, 17, 19, 20, 22, 24],
    [1, 10, 12, 14, 17, 2, 20, 21, 23, 24, 3, 5, 9],
    [0, 1, 6, 7, 8, 3, 4],
    [3, 4, 7, 11, 12, 14, 23, 15, 20, 22, 19],
    [21, 23, 16, 18, 9, 5, 4, 0, 15, 19],
    [0, 1, 9, 8, 6, 5, 18, 16, 22, 21, 17, 12, 24, 14, 13],
    [3, 5, 8, 11, 13, 16, 19, 21],
    [24, 19, 18, 23, 22, 17, 21, 16, 20, 15, 7],
    [3, 4, 7, 8, 9, 15, 16, 17, 20, 21],
    [3, 4, 14, 23, 15, 20, 22, 19, 13, 17, 12, 6, 5, 0, 1, 10, 2, 18],
    [0, 1, 10, 11, 12, 21, 22, 24, 5, 7, 9],
    [0, 1, 2, 3, 8, 13, 18, 23, 24, 12, 11, 10, 15, 20, 9]
  ];

  getNumberOfLevel = () => {
    return this.levelSolutions.length;
  };

  getLevelAt = (levelNumber) => {
    const solution = this.levelSolutions[levelNumber - 1];
    const levelStart = getLevelStartFromSolution(solution);
    return [ ...levelStart ];
  };

  getSolutionAt = (levelNumber) => {
    return [...this.levelSolutions[levelNumber - 1]];
  }
}