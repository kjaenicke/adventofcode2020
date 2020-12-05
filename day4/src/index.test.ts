import { validateHairColor, validateHeight } from "./index";

describe("day4", () => {
  describe("validateHeight", () => {
    it("should be valid cm height", () => {
      const result = validateHeight("175cm");
      expect(result).toBeTruthy();
    });
  });

  describe("validateHairColor", () => {
    it("should be a valid hair color", () => {
      const result = validateHairColor("#cfa07d");
      expect(result).toBeTruthy();
    });
  });
});
