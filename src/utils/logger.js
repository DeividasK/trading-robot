import chalk from "chalk";
import { omit } from "lodash";
import PrettyError from "pretty-error";

const pe = new PrettyError();

const isTesting = process.env.NODE_ENV === "test";

export function log(message: string) {
  if (!isTesting) {
    console.log(message);
  }
}

export function logError(error: any) {
  console.log(pe.render(error));
}

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

export function logTradeRecommendation(
  tradeRecommendation: TradeRecommendation,
) {
  const signalColour = getSignalColour(tradeRecommendation.signal);
  // $FlowFixMe
  const report = chalk[signalColour];

  console.log(`
------------
SIGNAL: ${report(tradeRecommendation.signal.toUpperCase())}

REASONS:
${tradeRecommendation.reasons.join("\n")}

CONDITIONS:
${Object.entries(tradeRecommendation.conditions)
    .map(entry => `${entry[0]}: ${String(entry[1])}`)
    .join("\n")}
------------`);
}
