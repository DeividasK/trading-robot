import { calculateTakeProfit } from "./calculateTakeProfit";

describe("calculateTakeProfit", () => {
  describe('if direction is "sell"', () => {
    describe("if minimal target * 1 does not pass closest 00 target", () => {
      it("should get closest 00 price", () => {
        const direction = "sell";
        const instrument = "EUR_GBP";
        const price = 0.89292;
        const stopLoss = 0.89525;

        const expectedTakeProfit = 0.89;

        expect(
          calculateTakeProfit({ direction, instrument, price, stopLoss }),
        ).toEqual(expectedTakeProfit);
      });
    });

    describe("if minimal target * 1 does pass closest 00 target", () => {
      it("should get 50 target below 00 target price", () => {
        const direction = "sell";
        const instrument = "EUR_GBP";
        const price = 0.89202;
        const stopLoss = 0.89525;

        const expectedTakeProfit = 0.885;

        expect(
          calculateTakeProfit({ direction, instrument, price, stopLoss }),
        ).toEqual(expectedTakeProfit);
      });
    });
  });

  describe('if direction is "buy"', () => {
    describe("if minimal target * 1 does not pass closest 00 target", () => {
      it("should get closest 00 price", () => {
        const direction = "buy";
        const instrument = "EUR_GBP";
        const price = 0.89687;
        const stopLoss = 0.89375;
        const expectedTakeProfit = 0.9;

        expect(
          calculateTakeProfit({ direction, instrument, price, stopLoss }),
        ).toEqual(expectedTakeProfit);
      });
    });

    describe("if minimal target * 1 does pass closest 00 target", () => {
      it("should get 50 target above 00 target price", () => {
        const direction = "buy";
        const instrument = "EUR_GBP";
        const price = 0.89682;
        const stopLoss = 0.8918;

        const expectedTakeProfit = 0.905;

        expect(
          calculateTakeProfit({ direction, instrument, price, stopLoss }),
        ).toEqual(expectedTakeProfit);
      });
    });
  });
});
