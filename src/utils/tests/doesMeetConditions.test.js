import { doesMeetConditions } from "../doesMeetConditions";

describe("doesMeetConditions", () => {
  describe("if position is open", () => {
    it("should return false if 'isOpen' condition is 'false'", () => {
      const conditions = {
        isOpen: false,
        price: 0.9005,
      };
      const position = {
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
      };

      expect(doesMeetConditions({ conditions, position })).toBe(false);
    });
  });

  describe("if there are no open positions", () => {
    it("should return false if 'isOpen' condition is 'true'", () => {
      const conditions = {
        isOpen: true,
        price: 0.9005,
      };
      const position = {
        instrument: "EUR_GBP",
        long: {
          units: "0",
          pl: "0.0000",
          resettablePL: "0.0000",
          financing: "0.0000",
          guaranteedExecutionFees: "0.0000",
          unrealizedPL: "0.0000",
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
      };

      expect(doesMeetConditions({ conditions, position })).toBe(false);
    });
  });
});
