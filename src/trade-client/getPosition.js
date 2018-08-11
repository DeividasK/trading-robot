import { get } from "lodash";

import { getAccounts } from "./getAccounts";
import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function getPosition({
  accountId,
  instrument,
}: {|
  accountId: string,
  instrument: InstrumentName,
|}): Promise<Position> {
  try {
    log(`Getting ${instrument} position`);
    const response = await request(
      `/accounts/${accountId}/positions/${instrument}`,
    );
    return response.position;
  } catch (error) {
    throw error;
  }
}
