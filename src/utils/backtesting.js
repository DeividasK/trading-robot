import chalk from "chalk";
import { getCandles } from ".";
import { movingAverageCrossOver } from "../strategies/movingAverageCrossOver";

function getSignalColour(signal) {
  switch (true) {
    case signal === "buy":
      return "green";
    case signal === "sell":
      return "red";
    default:
      return "yellow";
  }
}

export async function backtest() {
  const candles = await getCandles("EUR_GBP", { granularity: "D", count: 720 });

  candles.forEach((candle, index) => {
    const candlesSubset = candles.slice(0, index);
    const recommendation = movingAverageCrossOver({
      candles: candlesSubset,
      fastMA: 20,
      slowMA: 60,
      trend: 100,
    });
    const signalColour = getSignalColour(recommendation.signal);
    // $FlowFixMe
    const report = chalk[signalColour];
    console.log(`${report(recommendation.signal.toUpperCase())} signal
------------`);
    console.log(recommendation);
    console.log(`------------`);
  });
}
