import { getCandles } from "../getCandles";

describe("getCandles", () => {
  it("should return a list of open positions", async () => {
    const candles = await getCandles("EUR_GBP", {
      granularity: "M15",
      count: 2,
    });

    expect(candles).toEqual([
      {
        complete: true,
        volume: 475,
        time: "2018-08-10T09:00:00.000000000Z",
        mid: { o: "0.89808", h: "0.89856", l: "0.89784", c: "0.89784" },
      },
      {
        complete: false,
        volume: 171,
        time: "2018-08-10T09:15:00.000000000Z",
        mid: { o: "0.89787", h: "0.89796", l: "0.89743", c: "0.89792" },
      },
    ]);
  });
});
