/*
  "rising" - previous candle had a lower closing value
  "falling" - previous candle had a higher closing value
  "ranging" - previous candle had the same closing value
*/
type Trend = "rising" | "falling" | "ranging";

type Signal = "buy" | "sell" | "hold";

type Conditions = {| isOpen: boolean, price: number, stopLoss?: number |};

type HoldRecommendation = {|
  reasons: Array<string>,
  signal: "hold",
|};

type CreateOrderRecommendation = {|
  conditions: {|
    isOpen: false,
    price: number,
    stopLoss: number,
  |},
  reasons: Array<string>,
  signal: "buy" | "sell",
|};

type TakeProfitRecommendation = {|
  conditions: {|
    isOpen: true,
    price: number,
  |},
  reasons: Array<string>,
  signal: "buy" | "sell",
|};

type TradeRecommendation =
  | HoldRecommendation
  | CreateOrderRecommendation
  | TakeProfitRecommendation;
