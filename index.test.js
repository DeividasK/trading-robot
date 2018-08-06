import { getCandles } from ".";

describe("getCandles", () => {
  it("should return a moving average for the provided inputs", async () => {
    let sma = await getCandles("EUR_GBP", { count: 90, granularity: "D" });
    expect(sma).toEqual(0.8697);
    sma = await getCandles("EUR_GBP", { count: 7, granularity: "D" });
    expect(sma).toEqual(0.7628);
  });
});
