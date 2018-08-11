import { getPosition } from "../getPosition";

describe("getPosition", () => {
  it("should return a position for a given instrument", async () => {
    const position = await getPosition({
      accountId: "101-004-8993504-001",
      instrument: "EUR_GBP",
    });

    expect(position).toEqual({
      commission: "0.0000",
      financing: "0.0000",
      guaranteedExecutionFees: "0.0000",
      instrument: "EUR_GBP",
      long: {
        averagePrice: "0.90039",
        financing: "0.0000",
        guaranteedExecutionFees: "0.0000",
        pl: "0.0000",
        resettablePL: "0.0000",
        tradeIDs: ["15", "17"],
        units: "2",
        unrealizedPL: "-0.0064",
      },
      marginUsed: "0.0598",
      pl: "0.0000",
      resettablePL: "0.0000",
      short: {
        financing: "0.0000",
        guaranteedExecutionFees: "0.0000",
        pl: "0.0000",
        resettablePL: "0.0000",
        units: "0",
        unrealizedPL: "0.0000",
      },
      unrealizedPL: "-0.0064",
    });
  });
});
