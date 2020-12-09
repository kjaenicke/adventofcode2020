import { input } from "./input";

function parse() {
  return input
    .trim()
    .split("\n")
    .map((n) => parseInt(n, 10));
}

function partOne() {
  const nums = parse();

  return nums.find((num, idx) => {
    if (idx < 25) {
      return false;
    }

    const preamble = nums.slice(idx - 25, idx);
    return !preamble.filter((n) => preamble.includes(num - n)).length;
  });
}

function partTwo() {
  const invalidNumber = partOne();
  const nums = parse();

  if (invalidNumber) {
    let start = 0;
    let end = 0;
    let sum = 0;
    let slice: number[] = [];

    while (sum !== invalidNumber) {
      slice = nums.slice(start, end);
      sum = slice.reduce((acc, val) => acc + val, 0);

      if (sum < invalidNumber) end += 1;
      if (sum > invalidNumber) start += 1;
    }

    return Math.min(...slice) + Math.max(...slice);
  }
}

console.log(`The invalid number is: ${partOne()}`);
console.log(`Encryption weakness: ${partTwo()}`);
