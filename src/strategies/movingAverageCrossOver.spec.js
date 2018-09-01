import { getCandles } from "../trade-client/getCandles";
import { movingAverageCrossOver } from "./movingAverageCrossOver";

// long rising, medium above short -> buy if not open / look for entry
// long rising, medium below short -> sell if open / look for exit
// long falling, medium above short -> buy if open / look for exit
// long falling, medium below short -> sell if not open / look for entry

describe("movingAverageCrossOver", () => {
  describe("when not enough candles", () => {
    it("should exit early", () => {
      const signal = movingAverageCrossOver({
        candles: [],
        fastMA: 2,
        instrument: "GBP_USD",
        slowMA: 6,
        trend: 10,
      });

      expect(signal).toEqual({
        instrument: "GBP_USD",
        reasons: [
          "Not enough data to create a signal. Expected at least 11 candles, but got 0.",
        ],
        signal: "hold",
      });
    });
  });

  describe("when overall trend is falling", () => {
    describe("when slow moving average is falling", () => {
      describe("when fast moving average is rising", () => {
        it("should return a sell trade signal if there are no open orders", () => {
          const candles = [
            {
              complete: true,
              volume: 15126,
              time: "2018-07-23T21:00:00.000000000Z",
              mid: { o: "0.89250", h: "0.89270", l: "0.88854", c: "0.90000" },
            },
            {
              complete: true,
              volume: 17081,
              time: "2018-07-24T21:00:00.000000000Z",
              mid: { o: "0.88877", h: "0.89024", l: "0.88726", c: "0.90000" },
            },
            {
              complete: true,
              volume: 16967,
              time: "2018-07-25T21:00:00.000000000Z",
              mid: { o: "0.88891", h: "0.88958", l: "0.88650", c: "0.90000" },
            },
            {
              complete: true,
              volume: 12962,
              time: "2018-07-26T21:00:00.000000000Z",
              mid: { o: "0.88826", h: "0.88992", l: "0.88740", c: "0.90000" },
            },
            {
              complete: true,
              volume: 17941,
              time: "2018-07-29T21:00:00.000000000Z",
              mid: { o: "0.88882", h: "0.89188", l: "0.88810", c: "0.89500" },
            },
            {
              complete: true,
              volume: 14453,
              time: "2018-07-30T21:00:00.000000000Z",
              mid: { o: "0.89132", h: "0.89360", l: "0.89048", c: "0.89400" },
            },
            {
              complete: true,
              volume: 13837,
              time: "2018-07-31T21:00:00.000000000Z",
              mid: { o: "0.89103", h: "0.89174", l: "0.88833", c: "0.89300" },
            },
            {
              complete: true,
              volume: 17769,
              time: "2018-08-01T21:00:00.000000000Z",
              mid: { o: "0.88860", h: "0.89249", l: "0.88548", c: "0.89200" },
            },
            {
              complete: true,
              volume: 16098,
              time: "2018-08-02T21:00:00.000000000Z",
              mid: { o: "0.89038", h: "0.89191", l: "0.88936", c: "0.89200" },
            },
            {
              complete: true,
              volume: 10558,
              time: "2018-08-05T21:00:00.000000000Z",
              mid: { o: "0.88958", h: "0.89369", l: "0.88901", c: "0.89300" },
            },
            {
              complete: false,
              volume: 2212,
              time: "2018-08-06T21:00:00.000000000Z",
              mid: { o: "0.89240", h: "0.89338", l: "0.89234", c: "0.89350" },
            },
          ];

          const signal = movingAverageCrossOver({
            candles,
            fastMA: 2,
            instrument: "EUR_GBP",
            slowMA: 6,
            trend: 10,
          });

          expect(signal).toEqual({
            conditions: {
              isOpen: false,
              price: 0.89292,
              stopLoss: 0.89525,
            },
            instrument: "EUR_GBP",
            reasons: [
              "Fast moving average is 0.89325 with a rising trend",
              "Slow moving average is 0.89292 with a falling trend",
              "Overall trend is falling with a 0.89525 average",
            ],
            signal: "sell",
          });
        });
      });
    });
  });

  describe("when overall trend is rising", () => {
    describe("when slow moving average is rising", () => {
      it("should return a sell trade signal if fast moving average is rising and there is an open order", () => {
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
          instrument: "EUR_GBP",
          slowMA: 6,
          trend: 10,
        });

        expect(signal).toEqual({
          conditions: {
            isOpen: true,
            price: 0.8907,
          },
          instrument: "EUR_GBP",
          reasons: [
            "Fast moving average is 0.89268 with a rising trend",
            `Slow moving average is 0.8907 with a rising trend`,
            `Overall trend is rising with a 0.89021 average`,
          ],
          signal: "sell",
        });
      });

      it("should return a buy trade signal if fast moving average is falling and there is no open order", () => {
        const candles = [
          {
            complete: true,
            volume: 15126,
            time: "2018-07-23T21:00:00.000000000Z",
            mid: { o: "0.89250", h: "0.89270", l: "0.88854", c: "0.88000" },
          },
          {
            complete: true,
            volume: 17081,
            time: "2018-07-24T21:00:00.000000000Z",
            mid: { o: "0.88877", h: "0.89024", l: "0.88726", c: "0.88500" },
          },
          {
            complete: true,
            volume: 16967,
            time: "2018-07-25T21:00:00.000000000Z",
            mid: { o: "0.88891", h: "0.88958", l: "0.88650", c: "0.89000" },
          },
          {
            complete: true,
            volume: 12962,
            time: "2018-07-26T21:00:00.000000000Z",
            mid: { o: "0.88826", h: "0.88992", l: "0.88740", c: "0.89500" },
          },
          {
            complete: true,
            volume: 17941,
            time: "2018-07-29T21:00:00.000000000Z",
            mid: { o: "0.88882", h: "0.89188", l: "0.88810", c: "0.90000" },
          },
          {
            complete: true,
            volume: 14453,
            time: "2018-07-30T21:00:00.000000000Z",
            mid: { o: "0.89132", h: "0.89360", l: "0.89048", c: "0.89750" },
          },
          {
            complete: true,
            volume: 13837,
            time: "2018-07-31T21:00:00.000000000Z",
            mid: { o: "0.89103", h: "0.89174", l: "0.88833", c: "0.89500" },
          },
        ];

        const signal = movingAverageCrossOver({
          candles,
          fastMA: 2,
          instrument: "EUR_GBP",
          slowMA: 4,
          trend: 6,
        });

        expect(signal).toEqual({
          conditions: {
            isOpen: false,
            price: 0.89687,
            stopLoss: 0.89375,
          },
          instrument: "EUR_GBP",
          reasons: [
            "Fast moving average is 0.89625 with a falling trend",
            `Slow moving average is 0.89687 with a rising trend`,
            `Overall trend is rising with a 0.89375 average`,
          ],
          signal: "buy",
        });
      });
    });
  });
});
