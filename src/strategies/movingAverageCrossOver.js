import { getMovingAverage } from "..";
import type { Candlestick } from "..";

type Signal = "buy" | "sell" | "hold";
type Conditions = { isOpen: boolean, price: number };
type TradeSignal = {|
  conditions: Conditions,
  reasons: Array<string>,
  signal: Signal,
|};

export function movingAverageCrossOver({
  candles,
  fastMA,
  slowMA,
  trend,
}: {
  candles: Array<Candlestick>,
  fastMA: number,
  slowMA: number,
  trend: number,
}): TradeSignal {
  const signal = getMovingAverage(candles.slice((fastMA + 1) * -1));
  const shortTermTrend = getMovingAverage(candles.slice((slowMA + 1) * -1));
  const longTermTrend = getMovingAverage(candles.slice((trend + 1) * -1));

  return {
    conditions: {
      isOpen: true,
      price: shortTermTrend.average,
    },
    reasons: [
      `Fast moving average is ${signal.average} with a ${signal.trend} trend`,
      `Slow moving average is ${shortTermTrend.average} with a ${
        shortTermTrend.trend
      } trend`,
      `Overall trend is ${longTermTrend.trend} with a ${
        longTermTrend.average
      } average`,
    ],
    signal: "sell",
  };
}
