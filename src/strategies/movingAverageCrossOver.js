import { takeRight } from "lodash";

import { calculateTakeProfit } from "./calculateTakeProfit";
import { getMovingAverage } from "../utils";

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

type MovingAverageCrossOverArgs = {
  candles: Array<Candlestick>,
  fastMA: number,
  instrument: InstrumentName,
  slowMA: number,
  trend: number,
};

export function movingAverageCrossOver({
  candles,
  fastMA,
  instrument,
  slowMA,
  trend,
}: MovingAverageCrossOverArgs): TradeRecommendation {
  if (candles.length < trend + 1) {
    return {
      action: "hold",
      instrument,
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

  if (tradeSignal === "hold") {
    return {
      action: "hold",
      instrument,
      reasons: [
        `Couldn't determine a trade signal based on the existing trends. The trends are as follows:
- Short trend - ${signal.trend}
- Medium trend - ${shortTermTrend.trend}
- Long trend - ${longTermTrend.trend}
`,
      ],
      signal: "hold",
    };
  }

  const isOpen = getIsOpenCondition({
    longTrend: longTermTrend.trend,
    signal: tradeSignal,
  });

  if (isOpen) {
    return {
      action: "update",
      conditions: {
        isOpen,
        price: shortTermTrend.average,
      },
      instrument,
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
  } else {
    return {
      action: "create",
      conditions: {
        isOpen,
        price: shortTermTrend.average,
        stopLoss: longTermTrend.average,
        takeProfit: calculateTakeProfit({
          direction: tradeSignal,
          instrument,
          price: shortTermTrend.average,
          stopLoss: longTermTrend.average,
        }),
      },
      instrument,
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
}
