import "source-map-support/register";
import { get } from "lodash";

import { getAccounts } from "../trade-client/getAccounts";

import { log, logError } from "./logger";
import { request } from "./request";

async function getPricing() {
  try {
    const accounts = await getAccounts();
    const accountId = get(accounts, [0, "id"]);
    const response = await request(
      `/accounts/${accountId}/pricing?instruments=EUR_GBP `,
    );
  } catch (error) {
    logError(error);
  }
}

function getTrend(currentValue, previousValue): Trend {
  switch (true) {
    case currentValue > previousValue:
      return "rising";
    case currentValue < previousValue:
      return "falling";
    default:
      return "ranging";
  }
}

function getAverage(candles) {
  return candles
    .reduce((acc, candle) => {
      return acc + Number(candle.mid.c) / candles.length;
    }, 0)
    .toFixed(5);
}

export function getMovingAverage(
  candles: Array<Candlestick>,
): {| average: number, trend: Trend |} {
  const currentAverage = getAverage(candles.slice(1));
  const previousAverage = getAverage(candles.slice(0, -1));

  return {
    average: Number(currentAverage),
    trend: getTrend(currentAverage, previousAverage),
  };
}

// Backtesting
