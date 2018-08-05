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

async function openPositions() {
  try {
    const accounts = await getAccounts();
    console.log(`accounts`, accounts);
    const accountId = accounts[0].id;
    const response = await request(`/accounts/${accountId}/positions`);
    console.log(`received response`, response);
  } catch (error) {
    logError(error);
  }
}

openPositions();

// async function getHistoricalData() {
//   try {
//     const data = await fetch();
//     console.log(`received data`, data);
//   } catch (error) {
//     console.log(`error`, error);
//   }
// }

// getHistoricalData();
