type Signal = "buy" | "sell" | "hold";

type Conditions = {| isOpen: boolean, price: number |};

type TradeRecommendation = {|
  conditions?: Conditions,
  reasons: Array<string>,
  signal: Signal,
|};
