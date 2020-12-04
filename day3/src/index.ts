import { input } from "./input";

const TREE_CHAR = "#";

function parse() {
  return input.trim().split("\n");
}

function partOne() {
  return countTreesPerSlope(3, 1);
}

function partTwo() {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  return slopes.reduce((total, [x, y]) => {
    return total * countTreesPerSlope(x, y);
  }, 1);
}

function countTreesPerSlope(slopeX: number, slopeY: number) {
  const parsed = parse();
  const rowLength = parsed[0].length;

  let treeCount = 0;
  let rowsLeft = parsed.length - slopeY;
  let colOffset = 0;

  while (rowsLeft > 0) {
    const currentRow = parsed[parsed.length - rowsLeft];
    colOffset += slopeX;

    if (currentRow[colOffset % rowLength] === TREE_CHAR) {
      treeCount++;
    }

    rowsLeft -= slopeY;
  }

  return treeCount;
}
