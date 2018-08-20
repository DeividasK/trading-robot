/*
  "rising" - previous candle had a lower closing value
  "falling" - previous candle had a higher closing value
  "ranging" - previous candle had the same closing value
*/
type Trend = "rising" | "falling" | "ranging";

type Signal = "buy" | "sell" | "hold";

type Conditions = {| isOpen: boolean, price: number, stopLoss?: number |};

type TradeRecommendation = {|
  conditions?: Conditions,
  reasons: Array<string>,
  signal: Signal,
|};
