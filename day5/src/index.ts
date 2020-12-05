import { input } from "./input";

const FRONT_CHAR = "F";
const BACK_CHAR = "B";
const LEFT_CHAR = "L";
const RIGHT_CHAR = "R";

export function calculateSeatNumber(boardingPass: string) {
  const rowChars = boardingPass.substr(0, 7);
  const colChars = boardingPass.substr(7, 3);

  let rowMin = 0;
  let rowMax = 127;

  for (let i = 0; i <= rowChars.length; i++) {
    if (rowChars[i] === FRONT_CHAR) {
      rowMax = Math.floor((rowMax + rowMin) / 2);
    }

    if (rowChars[i] === BACK_CHAR) {
      rowMin = Math.ceil((rowMax + rowMin) / 2);
    }
  }

  let colMin = 0;
  let colMax = 7;

  for (let i = 0; i <= rowChars.length; i++) {
    if (colChars[i] === LEFT_CHAR) {
      colMax = Math.floor((colMax + colMin) / 2);
    }

    if (colChars[i] === RIGHT_CHAR) {
      colMin = Math.ceil((colMax + colMin) / 2);
    }
  }

  return rowMin * 8 + colMin;
}

function parse() {
  return input.trim().split("\n");
}

function partOne() {
  const parsed = parse();
  const seatNumbers = parsed.map((p) => calculateSeatNumber(p));
  return Math.max(...seatNumbers);
}

function partTwo() {
  const parsed = parse();
  const seatNumbers = parsed.map((p) => calculateSeatNumber(p));
  const min = Math.min(...seatNumbers);
  const max = Math.max(...seatNumbers);
  const sum = seatNumbers.reduce((p, c) => p + c, 0);

  return Math.ceil(seatNumbers.length / 2) * (min + max) - sum;
}

console.log(`Max seat number: ${partOne()}`);
console.log(`My seat number: ${partTwo()}`);
