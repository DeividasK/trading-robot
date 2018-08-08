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

// A decimal number encoded as a string. The amount of precision provided depends on the Price’s Instrument.
// http://developer.oanda.com/rest-live-v20/pricing-df/#PriceValue
type PriceValue = string;

// The RFC 3339 representation is a string conforming to https://tools.ietf.org/rfc/rfc3339.txt. The Unix representation is a string representing the number of seconds since the Unix Epoch (January 1st, 1970 at UTC). The value is a fractional number, where the fractional part represents a fraction of a second (up to nine decimal places).
// http://developer.oanda.com/rest-live-v20/primitives-df/#DateTime
type DateTime = string;

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
