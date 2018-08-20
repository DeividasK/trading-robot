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

    const tradeRecommendation = movingAverageCrossOver({
      candles: candles,
      fastMA: 20,
      slowMA: 60,
      trend: 100,
    });

    logTradeRecommendation(tradeRecommendation);

    const accounts = await getAccounts();
    const accountId = get(accounts, [0, "id"]);

    const orders = await getOrders();

    if (orders.length !== 0) {
      log(`There are existing orders: ${JSON.stringify(orders)}`);
      // TODO: Check if existing orders don't need to be modified
      return;
    }

    const positions = await getOpenPositions(accountId);

    if (orders.length !== 0 || positions.length !== 0) {
      log(`There are existing positions: ${JSON.stringify(positions)}`);
      // TODO: Check if take limit or stop loss orders don't need to be modified
      return;
    }

    if (
      tradeRecommendation.signal === "buy" &&
      tradeRecommendation.conditions.isOpen === "false"
    ) {
      // Create new order
      const orderRequest: LimitOrderRequest = {
        units: "1",
        instrument: "EUR_GBP",
        type: "LIMIT",
        price: tradeRecommendation.conditions.price,
      };

      await createOrder(orderRequest);
    }
  } catch (error) {
    logError(error);
  }
}
