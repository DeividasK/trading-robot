import { get } from "lodash";

import { getAccounts } from "./getAccounts";
import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function getOrders(): Promise<Array<Order>> {
  try {
    log(`Getting orders`);
    const accounts = await getAccounts();

    const accountId = get(accounts, [0, "id"]);

    const response = await request(`/accounts/${accountId}/orders`);

    return response.orders;
  } catch (error) {
    logError(error);
    return [];
  }
}
