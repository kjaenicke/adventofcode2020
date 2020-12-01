import input from "./input.json";

function partOne() {
  let pair: [number, number] = [0, 0];

  input.some((value) => {
    input.forEach((comparisonValue) => {
      if (value + comparisonValue === 2020) {
        pair = [value, comparisonValue];
        return true;
      }

      return false;
    });
  });

  const [first, second] = pair;
  return first * second;
}

function partTwo() {
  let triplet: [number, number, number] = [0, 0, 0];

  input.some((p1) => {
    input.forEach((p2) => {
      input.forEach((p3) => {
        if (p1 + p2 + p3 === 2020) {
          triplet = [p1, p2, p3];
          return true;
        }

        return false;
      });
    });
  });

  return triplet.reduce((p, c) => p * c, 1);
}

const value = partTwo();
console.log({ value });
