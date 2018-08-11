import { get } from "lodash";

import { getAccounts } from "./trade-client/getAccounts";
import { createOrder } from "./trade-client/createOrder";
import { getOrders } from "./trade-client/getOrders";
import { getCandles } from "./trade-client/getCandles";
import { log, logError, logTradeRecommendation } from "./utils/logger";
import { movingAverageCrossOver } from "./strategies/movingAverageCrossOver";
import { getOpenPositions } from "./trade-client/getOpenPositions";
import { doesMeetConditions } from "./utils/doesMeetConditions";

export async function trade() {
  try {
    const candles = await getCandles("EUR_GBP", {
      granularity: "M15",
      count: 101,
    });

    const accounts = await getAccounts();
    const accountId = get(accounts, [0, "id"]);

    const orders = await getOrders();
    const positions = await getOpenPositions(accountId);

    log(`Existing orders: ${JSON.stringify(orders)}`);
    log(`Existing positions: ${JSON.stringify(positions)}`);

    const tradeRecommendation = movingAverageCrossOver({
      candles: candles,
      fastMA: 20,
      slowMA: 60,
      trend: 100,
    });

    logTradeRecommendation(tradeRecommendation);

    if (orders.length === 0 && positions.length === 0) {
      await createOrder("EUR_GBP");
    }
  } catch (error) {
    logError(error);
  }
}
