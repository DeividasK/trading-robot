import { log, logError } from "../utils/logger";
import { request } from "../utils/request";

export async function getCandles(
  instrument: string,
  options: {|
    granularity: CandlestickGranularity,
    count: number,
  |},
): Promise<Array<Candlestick>> {
  log(
    `Getting ${instrument}, ${options.granularity} candles (${options.count})`,
  );

  try {
    const query = Object.keys(options)
      .map((filter, index) => {
        const join = index === 0 ? "?" : "&";
        return `${join}${filter}=${options[filter]}`;
      })
      .join("");
    const response = await request(
      `/instruments/${instrument}/candles${query}`,
    );

    return response.candles;
  } catch (error) {
    logError(error);
    return [];
  }
}
