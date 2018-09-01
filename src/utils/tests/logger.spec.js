import { logTradeRecommendation } from "../logger";

describe("logTradeRecommendation", () => {
  it("should log 'hold' recommendation without conditions", () => {
    const holdRecommendation: HoldRecommendation = {
      action: "hold",
      instrument: "EUR_GBP",
      signal: "hold",
      reasons: [
        `Couldn't determine a trade signal based on the existing trends. The trends are as follows:
- Short trend - rising
- Medium trend - rising
- Long trend - falling`,
      ],
    };

    expect(
      logTradeRecommendation(holdRecommendation, jest.fn()),
    ).toMatchSnapshot();
  });

  it("should log 'create order' recommendation with conditions", () => {
    const createOrderRecommendation: CreateOrderRecommendation = {
      action: "create",
      signal: "buy",
      reasons: [
        "Fast moving average is 0.89718 with a falling trend",
        "Slow moving average is 0.89682 with a falling trend",
        "Overall trend is falling with a 0.89688 average",
      ],
      instrument: "EUR_GBP",
      conditions: {
        isOpen: false,
        price: 0.89682,
        stopLoss: 0.8918,
        takeProfit: 0.905,
      },
    };

    expect(
      logTradeRecommendation(createOrderRecommendation, jest.fn()),
    ).toMatchSnapshot();
  });
});
