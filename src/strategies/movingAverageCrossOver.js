import { takeRight } from "lodash";

import { getMovingAverage } from "..";
import type { Candlestick, Trend } from "..";

type Signal = "buy" | "sell" | "hold";
type Conditions = { isOpen: boolean, price: number };
type TradeSignal = {|
  conditions: Conditions,
  reasons: Array<string>,
  signal: Signal,
|};

function getSignal({
  longTrend,
  mediumTrend,
  shortTrend,
}: {
  longTrend: Trend,
  mediumTrend: Trend,
  shortTrend: Trend,
}): Signal {
  if (
    longTrend === "rising" &&
    mediumTrend === "rising" &&
    shortTrend === "rising"
  ) {
    return "sell";
  }

  if (
    longTrend === "rising" &&
    mediumTrend === "rising" &&
    shortTrend === "falling"
  ) {
    return "buy";
  }

  return "hold";
}

function getOpenCondition({
  longTrend,
  signal,
}: {
  longTrend: Trend,
  signal: Signal,
}) {
  if (
    (longTrend === "rising" && signal === "buy") ||
    (longTrend === "falling" && signal === "sell")
  ) {
    return false;
  } else {
    return true;
  }
}

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
  const signal = getMovingAverage(takeRight(candles, fastMA + 1));
  const shortTermTrend = getMovingAverage(takeRight(candles, slowMA + 1));
  const longTermTrend = getMovingAverage(takeRight(candles, trend + 1));
  const tradeSignal = getSignal({
    shortTrend: signal.trend,
    mediumTrend: shortTermTrend.trend,
    longTrend: longTermTrend.trend,
  });

  return {
    conditions: {
      isOpen: getOpenCondition({
        longTrend: longTermTrend.trend,
        signal: tradeSignal,
      }),
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
    signal: tradeSignal,
  };
}
