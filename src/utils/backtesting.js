import chalk from "chalk";

import { getCandles } from "../trade-client/getCandles";
import { logTradeRecommendation } from "./logger";
import { movingAverageCrossOver } from "../strategies/movingAverageCrossOver";

export async function backtest() {
  const candles = await getCandles("EUR_GBP", { granularity: "D", count: 720 });

  candles.forEach((candle, index) => {
    const candlesSubset = candles.slice(0, index);
    const recommendation = movingAverageCrossOver({
      candles: candlesSubset,
      fastMA: 20,
      instrument: "EUR_GBP",
      slowMA: 60,
      trend: 100,
    });

    logTradeRecommendation(recommendation);
  });
}
