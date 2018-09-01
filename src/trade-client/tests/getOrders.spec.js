import { getOrders } from "../getOrders";

describe("getOrders", () => {
  it("should return a list of pending orders", async () => {
    const orders = await getOrders("101-004-8993504-002");

    expect(orders).toEqual([
      {
        id: "41",
        createTime: "2018-08-31T20:01:56.641165926Z",
        type: "STOP",
        instrument: "EUR_GBP",
        units: "1",
        timeInForce: "GTC",
        stopLossOnFill: { price: "0.89643", timeInForce: "GTC" },
        price: "0.89631",
        triggerCondition: "DEFAULT",
        partialFill: "DEFAULT_FILL",
        positionFill: "DEFAULT",
        state: "PENDING",
      },
    ]);
  });
});
