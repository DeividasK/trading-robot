import { generateOrderRequestFromRecommendation } from "../generateOrderRequestFromRecommendation";

describe("generateOrderRequestFromRecommendation", () => {
  it('should generate a "STOP" order when signal is "sell" and no orders exist', () => {
    const tradeRecommendation = {
      action: "create",
      conditions: {
        isOpen: false,
        price: 0.89292,
        stopLoss: 0.89525,
      },
      instrument: "EUR_GBP",
      signal: "sell",
      reasons: [],
    };

    const generatedOrderRequest = generateOrderRequestFromRecommendation(
      tradeRecommendation,
    );
    const expectedOrderRequest = {
      units: "1",
      instrument: "EUR_GBP",
      type: "STOP",
      price: "0.89292",
      stopLossOnFill: {
        price: "0.89525",
      },
    };

    expect(generatedOrderRequest).toEqual(expectedOrderRequest);
  });

  it('should generate a "LIMIT" order when signal is "buy" and no orders exist', () => {
    const tradeRecommendation = {
      action: "create",
      conditions: {
        isOpen: false,
        price: 0.89525,
        stopLoss: 0.89292,
      },
      instrument: "EUR_GBP",
      signal: "buy",
      reasons: [],
    };

    const generatedOrderRequest = generateOrderRequestFromRecommendation(
      tradeRecommendation,
    );
    const expectedOrderRequest = {
      units: "1",
      instrument: "EUR_GBP",
      type: "LIMIT",
      price: "0.89525",
      stopLossOnFill: {
        price: "0.89292",
      },
    };

    expect(generatedOrderRequest).toEqual(expectedOrderRequest);
  });
});
