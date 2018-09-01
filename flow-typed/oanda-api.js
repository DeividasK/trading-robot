// http://developer.oanda.com/rest-live-v20/instrument-df/#CandlestickGranularity
type CandlestickGranularity =
  | "S5"
  | "S10"
  | "S15"
  | "S30"
  | "M1"
  | "M2"
  | "M4"
  | "M5"
  | "M10"
  | "M15"
  | "M30"
  | "H1"
  | "H2"
  | "H3"
  | "H4"
  | "H6"
  | "H8"
  | "H12"
  | "D"
  | "W"
  | "M";

// The RFC 3339 representation is a string conforming to https://tools.ietf.org/rfc/rfc3339.txt. The Unix representation is a string representing the number of seconds since the Unix Epoch (January 1st, 1970 at UTC). The value is a fractional number, where the fractional part represents a fraction of a second (up to nine decimal places).
// http://developer.oanda.com/rest-live-v20/primitives-df/#DecimalNumber
// A date and time value using either RFC3339 or UNIX time representation.
type DateTime = string;

// A decimal number encoded as a string. The amount of precision provided depends on the Price’s Instrument.
// http://developer.oanda.com/rest-live-v20/pricing-df/PriceVale
type PriceValue = string;

type CandlestickData = {|
  // The first (open) price in the time-range represented by the candlestick.
  o: PriceValue,

  // The highest price in the time-range represented by the candlestick.
  h: PriceValue,

  // The lowest price in the time-range represented by the candlestick.
  l: PriceValue,

  // The last (closing) price in the time-range represented by the candlestick.
  c: PriceValue,
|};

// http://developer.oanda.com/rest-live-v20/instrument-df/#Candlestick
type Candlestick = {|
  // The start time of the candlestick
  // http://developer.oanda.com/rest-live-v20/primitives-df/#DateTime
  time: DateTime,

  // The candlestick data based on bids. Only provided if bid-based candles were requested.
  bid?: CandlestickData,

  // The candlestick data based on asks. Only provided if ask-based candles were requested.
  ask?: CandlestickData,

  // The candlestick data based on midpoints. Only provided if midpoint-based candles were requested.
  mid: CandlestickData,

  // The number of prices created during the time-range represented by the candlestick.
  volume: number,

  // A flag indicating if the candlestick is complete. A complete candlestick is one whose ending time is not in the future.
  complete: boolean,
|};

// http://developer.oanda.com/rest-live-v20/order-df/#OrderState
type OrderState =
  | "PENDING" // The Order is currently pending execution
  | "FILLED" // The Order has been filled
  | "TRIGGERED" // The Order has been triggered
  | "CANCELLED"; // The Order has been cancelled

// http://developer.oanda.com/rest-live-v20/order-df/#Order
type Order = {|
  // The Order’s identifier, unique within the Order’s Account.
  id: string, // (OrderID) http://developer.oanda.com/rest-live-v20/order-df/#OrderID

  // The time when the Order was created.
  createTime: DateTime,

  // The current state of the Order.
  state: OrderState,

  //http://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions
  // The client extensions of the Order. Do not set, modify, or delete clientExtensions if your account is associated with MT4.
  clientExtensions: ClientExtensions,
|};

// Instrument name identifier. Used by clients to refer to an Instrument
// http://developer.oanda.com/rest-live-v20/primitives-df/#InstrumentName
// A string containing the base currency and quote currency delimited by a “_”.
type InstrumentName = "EUR_GBP" | "GBP_USD";

// The string representation of a quantity of an Account’s home currency.
// http://developer.oanda.com/rest-live-v20/primitives-df/#AccountUnits
type AccountUnits = string;

// 	The string representation of a decimal number.
type DecimalNumber = string;

// The Trade’s identifier, unique within the Trade’s Account.
// Format	The string representation of the OANDA-assigned TradeID. OANDA-assigned TradeIDs are positive integers, and are derived from the TransactionID of the Transaction that opened the Trade.
// Example	1523
type TradeID = string;

// The representation of a Position for a single direction (long or short).
type PositionSide = {
  // Number of units in the position (negative value indicates short position, positive indicates long position).
  units: DecimalNumber,

  // Volume-weighted average of the underlying Trade open prices for the Position.
  averagePrice?: PriceValue,

  // List of the open Trade IDs which contribute to the open Position.
  tradeIDs?: Array<TradeID>,

  // Profit/loss realized by the PositionSide over the lifetime of the Account.
  pl: AccountUnits,

  // The unrealized profit/loss of all open Trades that contribute to this PositionSide.
  unrealizedPL: AccountUnits,

  // Profit/loss realized by the PositionSide since the Account’s resettablePL was last reset by the client.
  resettablePL: AccountUnits,

  // The total amount of financing paid/collected for this PositionSide over the lifetime of the Account.
  financing: AccountUnits,

  // The total amount of fees charged over the lifetime of the Account for the  execution of guaranteed Stop Loss Orders attached to Trades for this PositionSide.
  guaranteedExecutionFees: AccountUnits,
};

// The specification of a Position within an Account
// http://developer.oanda.com/rest-live-v20/position-df/#Position
type Position = {|
  // The Position’s Instrument.
  instrument: InstrumentName,
  // Profit/loss realized by the Position over the lifetime of the Account.
  pl: AccountUnits,

  // The unrealized profit/loss of all open Trades that contribute to this Position.
  unrealizedPL: AccountUnits,

  // Margin currently used by the Position.
  marginUsed: AccountUnits,

  // Profit/loss realized by the Position since the Account’s resettablePL was last reset by the client.
  resettablePL: AccountUnits,

  // The total amount of financing paid/collected for this instrument over the lifetime of the Account.
  financing: AccountUnits,

  // The total amount of commission paid for this instrument over the lifetime of the Account.
  commission: AccountUnits,

  //  The total amount of fees charged over the lifetime of the Account for the execution of guaranteed Stop Loss Orders for this instrument.
  guaranteedExecutionFees: AccountUnits,

  // The details of the long side of the Position.
  long: PositionSide,

  // The details of the short side of the Position.
  short: PositionSide,
|};

// http://developer.oanda.com/rest-live-v20/transaction-df/#ClientID
// A client-provided identifier, used by clients to refer to their Orders or Trades with an identifier that they have provided.
type ClientID = "string";

// http://developer.oanda.com/rest-live-v20/transaction-df/#ClientTag
// A client-provided tag that can contain any data and may be assigned to their Orders or Trades. Tags are typically used to associate groups of Trades and/or Orders together.
type ClientTag = "string";

// http://developer.oanda.com/rest-live-v20/transaction-df/#ClientComment
// A client-provided comment that can contain any data and may be assigned to their Orders or Trades. Comments are typically used to provide extra context or meaning to an Order or Trade.
type ClientComment = "string";

// http://developer.oanda.com/rest-live-v20/transaction-df/#ClientExtensions
type ClientExtensions = {
  // The Client ID of the Order/Trade
  id: ClientID,

  // A tag associated with the Order/Trade
  tag: ClientTag,

  // A comment associated with the Order/Trade
  comment: ClientComment,
};

// http://developer.oanda.com/rest-live-v20/order-df/#OrderType
type OrderType =
  | "MARKET" //	A Market Order
  | "LIMIT" //	A Limit Order
  | "STOP" //	A Stop Order
  | "MARKET_IF_TOUCHED" //	A Market-if-touched Order
  | "TAKE_PROFIT" //	A Take Profit Order
  | "STOP_LOSS" //	A Stop Loss Order
  | "TRAILING_STOP_LOSS" //	A Trailing Stop Loss Order
  | "FIXED_PRICE"; //	A Fixed Price Order

// http://developer.oanda.com/rest-live-v20/order-df/#TimeInForce
type TimeInForce =
  | "GTC" //	The Order is “Good unTil Cancelled”
  | "GTD" //	The Order is “Good unTil Date” and will be cancelled at the provided time
  | "GFD" //	The Order is “Good For Day” and will be cancelled at 5pm New York time
  | "FOK" //	The Order must be immediately “Filled Or Killed”
  | "IOC"; //	The Order must be “Immediatedly paritally filled Or Cancelled”

// http://developer.oanda.com/rest-live-v20/order-df/#OrderPositionFill
type OrderPositionFill =
  | "OPEN_ONLY" //	When the Order is filled, only allow Positions to be opened or extended.
  | "REDUCE_FIRST" //	When the Order is filled, always fully reduce an existing Position before opening a new Position.
  | "REDUCE_ONLY" //	When the Order is filled, only reduce an existing Position.
  | "DEFAULT"; //	When the Order is filled, use REDUCE_FIRST behaviour for non-client hedging Accounts, and OPEN_ONLY behaviour for client hedging Accounts.

// http://developer.oanda.com/rest-live-v20/order-df/#TakeProfitOrderRequest
type TakeProfitOrderRequest = {
  type: OrderType,
};

// http://developer.oanda.com/rest-live-v20/transaction-df/#TakeProfitDetails
type TakeProfitDetails = {
  // The price that the Take Profit Order will be triggered at. Only one of
  // the price and distance fields may be specified.
  price: PriceValue,

  // The time in force for the created Take Profit Order. This may only be
  // GTC, GTD or GFD.
  timeInForce?: TimeInForce, // default=GTC

  // The date when the Take Profit Order will be cancelled on if timeInForce
  // is GTD.
  gtdTime?: DateTime,

  // The Client Extensions to add to the Take Profit Order when created.
  clientExtensions?: ClientExtensions,
};

type StopLossDetailsWithPrice = {
  // The price that the Stop Loss Order will be triggered at.
  price: PriceValue,

  // The time in force for the created Stop Loss Order. This may only be GTC,
  // GTD or GFD.
  timeInForce?: "GTC" | "GTD" | "GFD", // TimeInForce, default=GTC

  // The date when the Stop Loss Order will be cancelled on if timeInForce is
  // GTD.
  gtdTime?: DateTime,

  // The Client Extensions to add to the Stop Loss Order when created.
  clientExtensions?: ClientExtensions,

  // Flag indicating that the price for the Stop Loss Order is guaranteed. The
  // default value depends on the GuaranteedStopLossOrderMode of the account,
  // if it is REQUIRED, the default will be true, for DISABLED or ENABLED the
  // default is false.
  guaranteed?: boolean,
};

type StopLossDetailsWithDistance = {
  // Specifies the distance (in price units) from the Trade’s open price to
  // use as the Stop Loss Order price.
  distance: DecimalNumber,

  // The time in force for the created Stop Loss Order. This may only be GTC,
  // GTD or GFD.
  timeInForce?: "GTC" | "GTD" | "GFD", // TimeInForce, default=GTC

  // The date when the Stop Loss Order will be cancelled on if timeInForce is
  // GTD.
  gtdTime?: DateTime,

  // The Client Extensions to add to the Stop Loss Order when created.
  clientExtensions?: ClientExtensions,

  // Flag indicating that the price for the Stop Loss Order is guaranteed. The
  // default value depends on the GuaranteedStopLossOrderMode of the account,
  // if it is REQUIRED, the default will be true, for DISABLED or ENABLED the
  // default is false.
  guaranteed?: boolean,
};

// http://developer.oanda.com/rest-live-v20/transaction-df/#StopLossDetails
// StopLossDetails specifies the details of a Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Stop Loss, or when a Trade’s dependent Stop Loss Order is modified directly through the Trade.
type StopLossDetails = StopLossDetailsWithPrice | StopLossDetailsWithDistance;

// http://developer.oanda.com/rest-live-v20/transaction-df/#TrailingStopLossDetails
// TrailingStopLossDetails specifies the details of a Trailing Stop Loss Order to be created on behalf of a client. This may happen when an Order is filled that opens a Trade requiring a Trailing Stop Loss, or when a Trade’s dependent Trailing Stop Loss Order is modified directly through the Trade.
type TrailingStopLossDetails = {
  // The distance (in price units) from the Trade’s fill price that the
  // Trailing Stop Loss Order will be triggered at.
  distance?: DecimalNumber,

  // The time in force for the created Trailing Stop Loss Order. This may only
  // be GTC, GTD or GFD.
  timeInForce?: TimeInForce, // default=GTC

  // The date when the Trailing Stop Loss Order will be cancelled on if
  // timeInForce is GTD.
  gtdTime?: DateTime,

  // The Client Extensions to add to the Trailing Stop Loss Order when
  // created.
  clientExtensions?: ClientExtensions,
};

// http://developer.oanda.com/rest-live-v20/order-df/#MarketOrderRequest
type MarketOrderRequest = {
  type: OrderType,
  instrument: InstrumentName,
  // The quantity requested to be filled by the Market Order. A posititive
  // number of units results in a long Order, and a negative number of units
  // results in a short Order.
  units: DecimalNumber,
  // The time-in-force requested for the Market Order. Restricted to FOK or
  // IOC for a MarketOrder.
  timeInForce?: TimeInForce, // default=FOK
  // The worst price that the client is willing to have the Market Order
  // filled at.
  priceBound?: PriceValue,
  // Specification of how Positions in the Account are modified when the Order
  // is filled.
  positionFill?: OrderPositionFill, // default=DEFAULT
  // The client extensions to add to the Order. Do not set, modify, or delete
  // clientExtensions if your account is associated with MT4.
  clientExtensions?: ClientExtensions,
  // TakeProfitDetails specifies the details of a Take Profit Order to be
  // created on behalf of a client. This may happen when an Order is filled
  // that opens a Trade requiring a Take Profit, or when a Trade’s dependent
  // Take Profit Order is modified directly through the Trade.
  takeProfitOnFill?: TakeProfitDetails,

  // StopLossDetails specifies the details of a Stop Loss Order to be created
  // on behalf of a client. This may happen when an Order is filled that opens
  // a Trade requiring a Stop Loss, or when a Trade’s dependent Stop Loss
  // Order is modified directly through the Trade.
  stopLossOnFill?: StopLossDetails,

  // TrailingStopLossDetails specifies the details of a Trailing Stop Loss
  // Order to be created on behalf of a client. This may happen when an Order
  // is filled that opens a Trade requiring a Trailing Stop Loss, or when a
  // Trade’s dependent Trailing Stop Loss Order is modified directly through
  // the Trade.
  trailingStopLossOnFill?: TrailingStopLossDetails,

  // Client Extensions to add to the Trade created when the Order is filled
  // (if such a Trade is created). Do not set, modify, or delete
  // tradeClientExtensions if your account is associated with MT4.
  tradeClientExtensions?: ClientExtensions,
};

// http://developer.oanda.com/rest-live-v20/order-df/#OrderTriggerCondition
// Specification of which price component should be used when determining if an Order should be triggered and filled. This allows Orders to be triggered based on the bid, ask, mid, default (ask for buy, bid for sell) or inverse (ask for sell, bid for buy) price depending on the desired behaviour. Orders are always filled using their default price component. This feature is only provided through the REST API. Clients who choose to specify a non-default trigger condition will not see it reflected in any of OANDA’s proprietary or partner trading platforms, their transaction history or their account statements. OANDA platforms always assume that an Order’s trigger condition is set to the default value when indicating the distance from an Order’s trigger price, and will always provide the default trigger condition when creating or modifying an Order. A special restriction applies when creating a guaranteed Stop Loss Order. In this case the TriggerCondition value must either be “DEFAULT”, or the “natural” trigger side “DEFAULT” results in. So for a Stop Loss Order for a long trade valid values are “DEFAULT” and “BID”, and for short trades “DEFAULT” and “ASK” are valid.
type OrderTriggerCondition =
  | "DEFAULT" // Trigger an Order the “natural” way: compare its price to the ask for long Orders and bid for short Orders.
  | "INVERSE" // Trigger an Order the opposite of the “natural” way: compare its price the bid for long Orders and ask for short Orders.
  | "BID" // Trigger an Order by comparing its price to the bid regardless of whether it is long or short.
  | "ASK" // Trigger an Order by comparing its price to the ask regardless of whether it is long or short.
  | "MID"; // Trigger an Order by comparing its price to the midpoint regardless of whether it is long or short.

// A LimitOrderRequest specifies the parameters that may be set when creating a Limit Order.
// http://developer.oanda.com/rest-live-v20/order-df/#LimitOrderRequest
type LimitOrderRequest = {
  // The type of the Order to Create. Must be set to “LIMIT” when creating a
  // Market Order.
  type: "LIMIT",

  // The Limit Order’s Instrument.
  instrument: InstrumentName,

  // The quantity requested to be filled by the Limit Order. A posititive
  // number of units results in a long Order, and a negative number of units
  // results in a short Order.
  units: DecimalNumber,

  // The price threshold specified for the Limit Order. The Limit Order will
  // only be filled by a market price that is equal to or better than this
  // price.
  price: PriceValue,

  // The time-in-force requested for the Limit Order.
  timeInForce?: TimeInForce, // default=GTC

  // The date/time when the Limit Order will be cancelled if its timeInForce
  // is “GTD”.
  gtdTime?: DateTime,

  // Specification of how Positions in the Account are modified when the Order
  // is filled.
  positionFill?: OrderPositionFill, // default=DEFAULT

  triggerCondition?: OrderTriggerCondition, // default=DEFAULT

  // The client extensions to add to the Order. Do not set, modify, or delete
  // clientExtensions if your account is associated with MT4.
  clientExtensions?: ClientExtensions,

  // TakeProfitDetails specifies the details of a Take Profit Order to be
  // created on behalf of a client. This may happen when an Order is filled
  // that opens a Trade requiring a Take Profit, or when a Trade’s dependent
  // Take Profit Order is modified directly through the Trade.
  takeProfitOnFill?: TakeProfitDetails,

  // StopLossDetails specifies the details of a Stop Loss Order to be created
  // on behalf of a client. This may happen when an Order is filled that opens
  // a Trade requiring a Stop Loss, or when a Trade’s dependent Stop Loss
  // Order is modified directly through the Trade.
  stopLossOnFill?: StopLossDetails,

  // TrailingStopLossDetails specifies the details of a Trailing Stop Loss
  // Order to be created on behalf of a client. This may happen when an Order
  // is filled that opens a Trade requiring a Trailing Stop Loss, or when a
  // Trade’s dependent Trailing Stop Loss Order is modified directly through
  // the Trade.
  trailingStopLossOnFill?: TrailingStopLossDetails,

  // Client Extensions to add to the Trade created when the Order is filled
  // (if such a Trade is created). Do not set, modify, or delete
  // tradeClientExtensions if your account is associated with MT4.
  tradeClientExtensions?: ClientExtensions,
};

// http://developer.oanda.com/rest-live-v20/order-df/#StopOrderRequest
// A StopOrderRequest specifies the parameters that may be set when creating a Stop Order.
type StopOrderRequest = {
  // The type of the Order to Create. Must be set to “STOP” when creating a
  // Stop Order.
  type: "STOP",

  // The Stop Order’s Instrument.
  instrument: InstrumentName,

  // The quantity requested to be filled by the Stop Order. A posititive
  // number of units results in a long Order, and a negative number of units
  // results in a short Order.
  units: DecimalNumber,

  // The price threshold specified for the Stop Order. The Stop Order will
  // only be filled by a market price that is equal to or worse than this
  // price.
  price: PriceValue,

  // The worst market price that may be used to fill this Stop Order. If the
  // market gaps and crosses through both the price and the priceBound, the
  // Stop Order will be cancelled instead of being filled.
  priceBound?: PriceValue,

  // The time-in-force requested for the Stop Order.
  timeInForce?: TimeInForce, // default=GTC

  // The date/time when the Stop Order will be cancelled if its timeInForce is
  // “GTD”.
  gtdTime?: DateTime,

  // Specification of how Positions in the Account are modified when the Order
  // is filled.
  positionFill?: OrderPositionFill, // default=DEFAULT

  triggerCondition?: OrderTriggerCondition, // default=DEFAULT

  // The client extensions to add to the Order. Do not set, modify, or delete
  // clientExtensions if your account is associated with MT4.
  clientExtensions?: ClientExtensions,

  // TakeProfitDetails specifies the details of a Take Profit Order to be
  // created on behalf of a client. This may happen when an Order is filled
  // that opens a Trade requiring a Take Profit, or when a Trade’s dependent
  // Take Profit Order is modified directly through the Trade.
  takeProfitOnFill?: TakeProfitDetails,

  // StopLossDetails specifies the details of a Stop Loss Order to be created
  // on behalf of a client. This may happen when an Order is filled that opens
  // a Trade requiring a Stop Loss, or when a Trade’s dependent Stop Loss
  // Order is modified directly through the Trade.
  stopLossOnFill?: StopLossDetails,

  // TrailingStopLossDetails specifies the details of a Trailing Stop Loss
  // Order to be created on behalf of a client. This may happen when an Order
  // is filled that opens a Trade requiring a Trailing Stop Loss, or when a
  // Trade’s dependent Trailing Stop Loss Order is modified directly through
  // the Trade.
  trailingStopLossOnFill?: TrailingStopLossDetails,

  // Client Extensions to add to the Trade created when the Order is filled
  // (if such a Trade is created). Do not set, modify, or delete
  // tradeClientExtensions if your account is associated with MT4.
  tradeClientExtensions?: ClientExtensions,
};

type OrderRequest =
  | LimitOrderRequest
  | MarketOrderRequest
  | StopOrderRequest
  | TakeProfitOrderRequest;
