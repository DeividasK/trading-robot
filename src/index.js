import "source-map-support/register";
import { get } from "lodash";

import { logError } from "./utils/logger";
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

export async function getCandles(
  instrument: string,
  options: any,
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

// A decimal number encoded as a string. The amount of precision provided depends on the Price’s Instrument.
// http://developer.oanda.com/rest-live-v20/pricing-df/#PriceValue
type PriceValue = string;

// The RFC 3339 representation is a string conforming to https://tools.ietf.org/rfc/rfc3339.txt. The Unix representation is a string representing the number of seconds since the Unix Epoch (January 1st, 1970 at UTC). The value is a fractional number, where the fractional part represents a fraction of a second (up to nine decimal places).
// http://developer.oanda.com/rest-live-v20/primitives-df/#DateTime
type DateTime = string;

type CandlestickData = {|
  // The first (open) price in the time-range represented by the candlestick.
  o: PriceValue,

  // The highest price in the time-range represented by the candlestick.
  h: PriceValue,

  // The lowest price in the time-range represented by the candlestick.
  l: PriceValue,

  // The last (closing) price in the time-range represented by the candlestick.
  c: PriceValue,
|};

// http://developer.oanda.com/rest-live-v20/instrument-df/#Candlestick
export type Candlestick = {|
  // The start time of the candlestick
  // http://developer.oanda.com/rest-live-v20/primitives-df/#DateTime
  time: DateTime,

  // The candlestick data based on bids. Only provided if bid-based candles were requested.
  bid?: CandlestickData,

  // The candlestick data based on asks. Only provided if ask-based candles were requested.
  ask?: CandlestickData,

  // The candlestick data based on midpoints. Only provided if midpoint-based candles were requested.
  mid: CandlestickData,

  // The number of prices created during the time-range represented by the candlestick.
  volume: number,

  // A flag indicating if the candlestick is complete. A complete candlestick is one whose ending time is not in the future.
  complete: boolean,
|};

type Trend = "rising" | "falling" | "ranging";

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
