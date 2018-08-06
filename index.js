import "source-map-support/register";

import { logError } from "./utils/logger";
import { request } from "./request";

async function getAccounts() {
  const API_KEY = process.env.API_KEY;
  const API_URL = process.env.API_URL;
  // const IDENTIFIER = process.env.IDENTIFIER;
  // const PASSWORD = process.env.PASSWORD;

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
    const accountId = accounts[0].id;
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
    const accountId = accounts[0].id;
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
    console.log(`accounts`, accounts);
    const accountId = accounts[0].id;
    const response = await request(
      `/accounts/${accountId}/pricing?instruments=EUR_GBP `,
    );
    console.log(`received response`, JSON.stringify(response));
  } catch (error) {
    logError(error);
  }
}

async function getCandles(instrument, options) {
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
    // console.log(`received response`, JSON.stringify(response));
    const sma = response.candles.reduce((acc, candle) => {
      if (!candle.complete) {
        return acc;
      }
      return acc + new Number(candle.mid.c) / options.count;
    }, 0);
    console.log(`${options.count} ${options.granularity} SMA`, sma.toFixed(4));
  } catch (error) {
    logError(error);
  }
}

// getOpenPositions();
// createOrder();
// getPricing();
getCandles("EUR_GBP", { count: 90, granularity: "D" });
getCandles("EUR_GBP", { count: 7, granularity: "D" });
