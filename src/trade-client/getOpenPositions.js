import { get } from "lodash";

import { getAccounts } from "./getAccounts";
import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function getOpenPositions(): Promise<Array<Position>> {
  try {
    log(`Getting open positions`);
    const accounts = await getAccounts();
    const accountId = get(accounts, [0, "id"]);

    const response = await request(`/accounts/${accountId}/openPositions`);
    return response.positions;
  } catch (error) {
    logError(error);
    return [];
  }
}
