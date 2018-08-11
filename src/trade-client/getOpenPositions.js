import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function getOpenPositions(
  accountId: string,
): Promise<Array<Position>> {
  try {
    log(`Getting open positions`);
    const response = await request(`/accounts/${accountId}/openPositions`);
    return response.positions;
  } catch (error) {
    logError(error);
    throw error;
  }
}
