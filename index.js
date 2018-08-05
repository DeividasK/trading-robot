import "source-map-support/register";

import { logError } from "./utils/logger";
import { request } from "./request";

async function login() {
  const API_KEY = process.env.IG_API_KEY;
  const API_URL = process.env.IG_API_URL;
  const IDENTIFIER = process.env.IG_IDENTIFIER;
  const PASSWORD = process.env.IG_PASSWORD;

  try {
    const response = await request(`${API_URL}/session`, {
      body: JSON.stringify({
        identifier: IDENTIFIER,
        password: PASSWORD,
      }),
      method: "POST",
      headers: {
        "X-IG-API-KEY": API_KEY,
      },
    });

    console.log(`response`, response);
    const {
      accountId,
      oauthToken: { access_token },
    } = response;
    console.log(`access_token`, access_token);

    return { token: access_token, accountId };
  } catch (error) {
    logError(error);
  }
}

async function openPositions() {
  const API_KEY = process.env.IG_API_KEY;
  const API_URL = process.env.IG_API_URL;

  try {
    const { accountId, token } = await login();
    const response = await request(`${API_URL}/positions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "IG-ACCOUNT-ID": accountId,
        "X-IG-API-KEY": API_KEY,
      },
    });
    console.log(`received response`, response);
  } catch (error) {
    logError(error);
  }
}

login();
// openPositions();

// async function getHistoricalData() {
//   try {
//     const data = await fetch();
//     console.log(`received data`, data);
//   } catch (error) {
//     console.log(`error`, error);
//   }
// }

// getHistoricalData();
