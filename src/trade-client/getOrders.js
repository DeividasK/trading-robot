import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function getOrders(accountId: string): Promise<Array<Order>> {
  try {
    log(`Getting orders`);

    const response = await request(`/accounts/${accountId}/orders`);

    return response.orders;
  } catch (error) {
    logError(error);
    return [];
  }
}
