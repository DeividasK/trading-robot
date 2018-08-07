import { getCandles } from "..";
import { movingAverageCrossOver } from "./movingAverageCrossOver";

describe("movingAverageCrossOver", () => {
  it("should return a sell trade signal on the condition of an order being open", async () => {
    const candles = [
      {
        complete: true,
        volume: 15126,
        time: "2018-07-23T21:00:00.000000000Z",
        mid: { o: "0.89250", h: "0.89270", l: "0.88854", c: "0.88890" },
      },
      {
        complete: true,
        volume: 17081,
        time: "2018-07-24T21:00:00.000000000Z",
        mid: { o: "0.88877", h: "0.89024", l: "0.88726", c: "0.88912" },
      },
      {
        complete: true,
        volume: 16967,
        time: "2018-07-25T21:00:00.000000000Z",
        mid: { o: "0.88891", h: "0.88958", l: "0.88650", c: "0.88812" },
      },
      {
        complete: true,
        volume: 12962,
        time: "2018-07-26T21:00:00.000000000Z",
        mid: { o: "0.88826", h: "0.88992", l: "0.88740", c: "0.88930" },
      },
      {
        complete: true,
        volume: 17941,
        time: "2018-07-29T21:00:00.000000000Z",
        mid: { o: "0.88882", h: "0.89188", l: "0.88810", c: "0.89138" },
      },
      {
        complete: true,
        volume: 14453,
        time: "2018-07-30T21:00:00.000000000Z",
        mid: { o: "0.89132", h: "0.89360", l: "0.89048", c: "0.89066" },
      },
      {
        complete: true,
        volume: 13837,
        time: "2018-07-31T21:00:00.000000000Z",
        mid: { o: "0.89103", h: "0.89174", l: "0.88833", c: "0.88842" },
      },
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
        complete: true,
        volume: 10558,
        time: "2018-08-05T21:00:00.000000000Z",
        mid: { o: "0.88958", h: "0.89369", l: "0.88901", c: "0.89256" },
      },
      {
        complete: false,
        volume: 2212,
        time: "2018-08-06T21:00:00.000000000Z",
        mid: { o: "0.89240", h: "0.89338", l: "0.89234", c: "0.89280" },
      },
    ];

    const signal = movingAverageCrossOver({
      candles,
      fastMA: 2,
      slowMA: 6,
      trend: 10,
    });

    expect(signal).toEqual({
      conditions: {
        isOpen: true,
        price: 0.8907,
      },
      reasons: [
        "Fast moving average is 0.89268 with a rising trend",
        `Slow moving average is 0.8907 with a rising trend`,
        `Overall trend is rising with a 0.89021 average`,
      ],
      signal: "sell",
    });
  });
});