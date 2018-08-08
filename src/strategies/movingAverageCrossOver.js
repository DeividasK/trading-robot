import { takeRight } from "lodash";

import { getMovingAverage } from "../utils";
import type { Trend } from "../utils";

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

  if (
    longTrend === "falling" &&
    mediumTrend === "falling" &&
    shortTrend === "rising"
  ) {
    return "sell";
  }

  if (
    longTrend === "falling" &&
    mediumTrend === "falling" &&
    shortTrend === "falling"
  ) {
    return "buy";
  }

  return "hold";
}

function getIsOpenCondition({
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
}): TradeRecommendation {
  if (candles.length < trend + 1) {
    return {
      reasons: [
        `Not enough data to create a signal. Expected at least ${trend +
          1} candles, but got ${candles.length}.`,
      ],
      signal: "hold",
    };
  }

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
      isOpen: getIsOpenCondition({
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
