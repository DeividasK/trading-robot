// Instrument name identifier. Used by clients to refer to an Instrument
// http://developer.oanda.com/rest-live-v20/primitives-df/#InstrumentName
// A string containing the base currency and quote currency delimited by a “_”.
type InstrumentName = "EUR_GBP" | "GBP_USD";

/*
  "rising" - previous candle had a lower closing value
  "falling" - previous candle had a higher closing value
  "ranging" - previous candle had the same closing value
*/
type Trend = "rising" | "falling" | "ranging";

type Action = "hold" | "create" | "update";
type Conditions = {| isOpen: boolean, price: number, stopLoss?: number |};
type Signal = "buy" | "sell" | "hold";

type HoldRecommendation = {|
  action: "hold",
  instrument: InstrumentName,
  reasons: Array<string>,
  signal: "hold",
|};

type CreateOrderRecommendation = {|
  action: "create",
  conditions: {|
    isOpen: false,
    price: number,
    stopLoss: number,
    takeProfit: number,
  |},
  instrument: InstrumentName,
  reasons: Array<string>,
  signal: "buy" | "sell",
|};

type TakeProfitRecommendation = {|
  action: "update",
  conditions: {|
    isOpen: true,
    price: number,
  |},
  instrument: InstrumentName,
  reasons: Array<string>,
  signal: "buy" | "sell",
|};

type TradeRecommendation =
  | HoldRecommendation
  | CreateOrderRecommendation
  | TakeProfitRecommendation;
