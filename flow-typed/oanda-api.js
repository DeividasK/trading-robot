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
  clientExtensions: any,
|};

// Instrument name identifier. Used by clients to refer to an Instrument
// http://developer.oanda.com/rest-live-v20/primitives-df/#InstrumentName
// A string containing the base currency and quote currency delimited by a “_”.
type InstrumentName = "EUR_GBP";

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
  averagePrice: PriceValue,

  // List of the open Trade IDs which contribute to the open Position.
  tradeIDs: Array<TradeID>,

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
type Postion = {|
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
  long?: PositionSide,

  // The details of the short side of the Position.
  short?: PositionSide,
|};
