import { getMovingAverage } from ".";

describe("getCandles", () => {
  describe("getMovingAverage", () => {
    it("should return an average price and a trend", () => {
      const candles = [
        {
          complete: true,
          volume: 17769,
          time: "2018-08-01T21:00:00.000000000Z",
          mid: { o: "0.88860", h: "0.89249", l: "0.88548", c: "0.89009" },
        },
        {
          complete: true,
          volume: 16098,
          time: "2018-08-02T21:00:00.000000000Z",
          mid: { o: "0.89038", h: "0.89191", l: "0.88936", c: "0.88966" },
        },
        {
          complete: false,
          volume: 10005,
          time: "2018-08-05T21:00:00.000000000Z",
          mid: { o: "0.88958", h: "0.89369", l: "0.88901", c: "0.89283" },
        },
      ];

      expect(getMovingAverage(candles)).toMatchObject({
        average: 0.89125,
        trend: "rising",
      });
    });
  });
});
