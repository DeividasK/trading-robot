import { createOrder } from "../createOrder";

describe("createOrder", () => {
  it("should return a create order response", async () => {
    const orderRequest = {
      units: "1",
      instrument: "GBP_USD",
      type: "STOP",
      price: "0.89622",
      stopLossOnFill: { price: "0.89639" },
    };
    const response = await createOrder("101-004-8993504-003", orderRequest);

    expect(response).toEqual({
      lastTransactionID: "6",
      orderCreateTransaction: {
        accountID: "101-004-8993504-003",
        batchID: "6",
        id: "6",
        instrument: "GBP_USD",
        partialFill: "DEFAULT",
        positionFill: "DEFAULT",
        price: "0.89622",
        reason: "CLIENT_ORDER",
        requestID: "60484803345005132",
        stopLossOnFill: { price: "0.89639", timeInForce: "GTC" },
        time: "2018-09-01T10:49:42.267835195Z",
        timeInForce: "GTC",
        triggerCondition: "DEFAULT",
        type: "STOP_ORDER",
        units: "1",
        userID: 8993504,
      },
      relatedTransactionIDs: ["6"],
    });
  });
});
