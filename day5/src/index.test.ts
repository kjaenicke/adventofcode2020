import { calculateSeatNumber } from ".";

describe("day5", () => {
  describe("calculateSeatNumber", () => {
    it("should return an integer value for the seat number", () => {
      const result = calculateSeatNumber("FBFBBFFRLR");
      expect(result).toEqual(357);
    });
  });
});
