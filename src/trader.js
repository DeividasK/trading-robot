import { createOrder } from "./trade-client/createOrder";
import { getOrders } from "./trade-client/getOrders";
import { getCandles } from "./utils";
import { log, logError, logTradeRecommendation } from "./utils/logger";
import { movingAverageCrossOver } from "./strategies/movingAverageCrossOver";
import { getOpenPositions } from "./trade-client/getOpenPositions";

export async function trade() {
  try {
    const candles = await getCandles("EUR_GBP", {
      granularity: "M15",
      count: 101,
    });

    const orders = await getOrders();
    const positions = await getOpenPositions();

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
      await createOrder();
    }
  } catch (error) {
    logError(error);
  }
}
