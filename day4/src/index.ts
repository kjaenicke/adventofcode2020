import { input } from "./input";

function parse() {
  return input.trim().split("\n\n");
}

const REQUIRED_PASSPORT_FIELDS = {
  byr: true,
  iyr: true,
  eyr: true,
  hgt: true,
  hcl: true,
  ecl: true,
  pid: true,
  cid: false,
};

function partOne() {
  const parsed = parse();
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  let validPassports = 0;

  parsed.forEach((passport) => {
    let matchingRequiredFieldsCount = 0;

    passport.split(/\s+/).forEach((fieldWithValue: string) => {
      const [field] = fieldWithValue.split(":");

      if (requiredFields.includes(field)) {
        matchingRequiredFieldsCount++;
      }
    });

    if (matchingRequiredFieldsCount === requiredFields.length) {
      validPassports++;
    }
  });

  return validPassports;
}

export function validateHeight(val: string): boolean {
  if (val.endsWith("cm")) {
    const num = parseInt(val.substr(0, val.length - 2));
    return num >= 150 && num <= 193;
  }

  if (val.endsWith("in")) {
    const num = parseInt(val.substr(0, val.length - 2));
    return num >= 59 && num <= 76;
  }

  return false;
}

export function validateHairColor(val: string): boolean {
  return (
    val.startsWith("#") &&
    val
      .substr(1)
      .split("")
      .every((c) =>
        [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "a",
          "b",
          "c",
          "d",
          "e",
          "f",
        ].includes(c)
      )
  );
}

function partTwo() {
  const parsed = parse();
  const fieldValidator: Record<string, (val: string) => boolean> = {
    byr: (val: string) => {
      try {
        const parsed = parseInt(val);
        return parsed >= 1920 && parsed <= 2002;
      } catch {
        return false;
      }
    },
    iyr: (val: string) => {
      try {
        const parsed = parseInt(val);
        return parsed >= 2010 && parsed <= 2020;
      } catch {
        return false;
      }
    },
    eyr: (val: string) => {
      try {
        const parsed = parseInt(val);
        return parsed >= 2020 && parsed <= 2030;
      } catch {
        return false;
      }
    },
    hgt: validateHeight,
    hcl: validateHairColor,
    ecl: (val: string) => {
      return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val);
    },
    pid: (val: string) => {
      try {
        parseInt(val);
        return val.length === 9;
      } catch {
        return false;
      }
    },
  };

  const requiredFieldsCount = Object.keys(fieldValidator).length;
  let validPassports = 0;

  parsed.forEach((passport) => {
    let matchingRequiredFieldsCount = 0;

    passport.split(/\s+/).forEach((fieldWithValue: string) => {
      const [field, value] = fieldWithValue.split(":");

      if (
        fieldValidator.hasOwnProperty(field) &&
        fieldValidator[field](value)
      ) {
        matchingRequiredFieldsCount++;
      }
    });

    if (matchingRequiredFieldsCount === requiredFieldsCount) {
      validPassports++;
    }
  });

  return validPassports;
}

console.log(`Valid Passwords: ${partTwo()}`);
