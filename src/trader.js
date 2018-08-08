import { getCandles } from "./utils";
import { logError } from "./utils/logger";

export async function trade() {
  try {
    console.log(`Getting EUR_GBP candles`);
    const candles = await getCandles("EUR_GBP", {
      granularity: "M1",
      count: 101,
    });
    console.log(`Received candles`);
  } catch (error) {
    logError(error);
  }
}
