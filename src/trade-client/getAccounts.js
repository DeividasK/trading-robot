import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

export async function getAccounts() {
  try {
    log(`Getting accounts`);

    const response = await request(`/accounts`);

    const { accounts } = response;

    return accounts;
  } catch (error) {
    logError(error);
  }
}
