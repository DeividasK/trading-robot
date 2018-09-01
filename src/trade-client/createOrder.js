import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function createOrder(
  accountId: string,
  orderRequest: OrderRequest,
) {
  try {
    log(`Creating an order`);
    const response = await request(`/accounts/${accountId}/orders `, {
      method: "POST",
      body: JSON.stringify({
        order: orderRequest,
      }),
    });
    return response;
  } catch (error) {
    logError(error);
  }
}
