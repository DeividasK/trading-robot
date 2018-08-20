import { get } from "lodash";

import { getAccounts } from "./getAccounts";
import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function createOrder(orderRequest: OrderRequest) {
  try {
    log(`Creating an order`);
    const accounts = await getAccounts();
    const accountId = get(accounts, [0, "id"]);

    const response = await request(`/accounts/${accountId}/orders `, {
      method: "POST",
      body: JSON.stringify({
        order: orderRequest,
      }),
    });
    console.log(`received response`, response);
  } catch (error) {
    logError(error);
  }
}
