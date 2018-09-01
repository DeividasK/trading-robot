import { get } from "lodash";

import { getAccounts } from "./trade-client/getAccounts";
import { createOrder } from "./trade-client/createOrder";
import { getOrders } from "./trade-client/getOrders";
import { getCandles } from "./trade-client/getCandles";
import { log, logError, logTradeRecommendation } from "./utils/logger";
import { movingAverageCrossOver } from "./strategies/movingAverageCrossOver";
import { getOpenPositions } from "./trade-client/getOpenPositions";
import { doesMeetConditions } from "./utils/doesMeetConditions";
import { generateOrderRequestFromRecommendation } from "./utils/generateOrderRequestFromRecommendation";

async function getAccountId() {
  const accounts = await getAccounts();
  return get(accounts, [0, "id"]);
}

export async function trade() {
  const INSTRUMENT = "GBP_USD";

  try {
    const candles = await getCandles(INSTRUMENT, {
      granularity: "M15",
      count: 101,
    });

    const tradeRecommendation = movingAverageCrossOver({
      candles: candles,
      fastMA: 20,
      instrument: INSTRUMENT,
      slowMA: 60,
      trend: 100,
    });

    logTradeRecommendation(tradeRecommendation);

    if (tradeRecommendation.signal === "hold") {
      log(`Doing nothing as the signal was "hold".`);
      return;
    }

    const accountId = process.env.ACCOUNT_ID || (await getAccountId());

    const orders = await getOrders(accountId);

    if (orders.length !== 0) {
      log(`There are existing orders: ${JSON.stringify(orders)}`);
      // TODO: Check if existing orders don't need to be modified
      return;
    }

    const positions = await getOpenPositions(accountId);

    if (
      positions.length !== 0 &&
      tradeRecommendation.conditions.isOpen === true
    ) {
      log(`There are existing positions: ${JSON.stringify(positions)}`);
      // TODO: Check if take profit or stop loss orders don't need to be modified
      return;
    }

    const orderRequest = generateOrderRequestFromRecommendation(
      ((tradeRecommendation: any): CreateOrderRecommendation),
    );

    const response = await createOrder(accountId, orderRequest);
    log(
      `Sent an order request: ${JSON.stringify(
        orderRequest,
      )}. Server response: ${JSON.stringify(response)}`,
    );
  } catch (error) {
    logError(error);
  }
}
