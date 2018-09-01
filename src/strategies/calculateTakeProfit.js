import Decimal from "decimal.js-light";

type CalculateTakeProfit = {|
  direction: "buy" | "sell",
  instrument: InstrumentName,
  price: number,
  stopLoss: number,
|};

export function calculateTakeProfit({
  direction,
  instrument,
  price: p,
  stopLoss: sl,
}: CalculateTakeProfit) {
  const stopLoss = new Decimal(sl);
  const price = new Decimal(p);

  // Closest flat target = 00 / 50 area
  const flatTarget = 0.005;

  if (direction === "sell") {
    const minimalTarget = stopLoss.minus(price);

    const distanceToClosestFlatTarget = price.mod(flatTarget);

    const didPassClosestFlatTarget = distanceToClosestFlatTarget
      .minus(minimalTarget)
      .lessThanOrEqualTo(0);

    if (didPassClosestFlatTarget) {
      return price
        .minus(distanceToClosestFlatTarget)
        .minus(flatTarget)
        .toNumber();
    } else {
      return price.minus(distanceToClosestFlatTarget).toNumber();
    }
  } else {
    const minimalTarget = price.minus(stopLoss);

    // Because this will always find the closest flat target when selling,
    // we can invert this to find the closest flat target for buying
    const distanceToClosestFlatTarget = price
      .mod(flatTarget)
      .minus(flatTarget)
      .negated();

    const didPassClosestFlatTarget = distanceToClosestFlatTarget
      .minus(minimalTarget)
      .lessThanOrEqualTo(0);

    if (didPassClosestFlatTarget) {
      return price
        .plus(distanceToClosestFlatTarget)
        .plus(flatTarget)
        .toNumber();
    } else {
      return price.plus(distanceToClosestFlatTarget).toNumber();
    }
  }
}
