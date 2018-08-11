import { getOpenPositions } from "../getOpenPositions";

describe("getOpenPositions", () => {
  it("should return a list of open positions", async () => {
    const openPositions = await getOpenPositions("101-004-8993504-001");

    expect(openPositions).toEqual([
      {
        instrument: "EUR_GBP",
        long: {
          units: "2",
          averagePrice: "0.90039",
          pl: "0.0000",
          resettablePL: "0.0000",
          financing: "0.0000",
          guaranteedExecutionFees: "0.0000",
          tradeIDs: ["15", "17"],
          unrealizedPL: "0.0018",
        },
        short: {
          units: "0",
          pl: "0.0000",
          resettablePL: "0.0000",
          financing: "0.0000",
          guaranteedExecutionFees: "0.0000",
          unrealizedPL: "0.0000",
        },
        pl: "0.0000",
        resettablePL: "0.0000",
        financing: "0.0000",
        commission: "0.0000",
        guaranteedExecutionFees: "0.0000",
        unrealizedPL: "0.0018",
        marginUsed: "0.0600",
      },
    ]);
  });
});
