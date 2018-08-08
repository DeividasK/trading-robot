import "source-map-support/register";
import { get } from "lodash";

import { logError } from "./logger";
import { request } from "./request";

async function getAccounts() {
  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;

  try {
    const response = await request(`/accounts`);

    const { accounts } = response;

    return accounts;
  } catch (error) {
    logError(error);
  }
}

async function getOpenPositions() {
  try {
    const accounts = await getAccounts();
    console.log(`accounts`, accounts);
    const accountId = get(accounts, [0, "id"]);
    const response = await request(`/accounts/${accountId}/openPositions`);
    console.log(`received response`, response);
  } catch (error) {
    logError(error);
  }
}

async function createOrder() {
  try {
    const accounts = await getAccounts();
    console.log(`accounts`, accounts);
    const accountId = get(accounts, [0, "id"]);
    const response = await request(`/accounts/${accountId}/orders `, {
      method: "POST",
      body: JSON.stringify({
        order: {
          units: "1",
          instrument: "EUR_GBP",
          type: "MARKET",
        },
      }),
    });
    console.log(`received response`, response);
  } catch (error) {
    logError(error);
  }
}

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

type GetCandlesOptions = {|
  granularity: CandlestickGranularity,
  count: number,
|};

export async function getCandles(
  instrument: string,
  options: GetCandlesOptions,
): Promise<Array<Candlestick>> {
  try {
    const query = Object.keys(options)
      .map((filter, index) => {
        const join = index === 0 ? "?" : "&";
        return `${join}${filter}=${options[filter]}`;
      })
      .join("");
    const response = await request(
      `/instruments/${instrument}/candles${query}`,
    );

    return response.candles;
  } catch (error) {
    logError(error);
    return [];
  }
}

function getAverage(candles) {
  return candles
    .reduce((acc, candle) => {
      return acc + Number(candle.mid.c) / candles.length;
    }, 0)
    .toFixed(5);
}

/*
  "rising" - previous candle had a lower closing value
  "falling" - previous candle had a higher closing value
  "ranging" - previous candle had the same closing value
*/
export type Trend = "rising" | "falling" | "ranging";

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
