export function generateOrderRequestFromRecommendation(
  tradeRecommendation: CreateOrderRecommendation,
): StopOrderRequest {
  if (
    tradeRecommendation.signal === "sell" &&
    tradeRecommendation.conditions.isOpen === false
  ) {
    const orderRequest: StopOrderRequest = {
      units: "1",
      instrument: tradeRecommendation.instrument,
      type: "STOP",
      price: tradeRecommendation.conditions.price.toString(),
      stopLossOnFill: {
        price: tradeRecommendation.conditions.stopLoss.toString(),
      },
      takeProfitOnFill: {
        price: tradeRecommendation.conditions.takeProfit.toString(),
      },
    };

    return orderRequest;
  }

  if (
    tradeRecommendation.signal === "buy" &&
    tradeRecommendation.conditions.isOpen === false
  ) {
    const orderRequest: StopOrderRequest = {
      units: "1",
      instrument: tradeRecommendation.instrument,
      type: "STOP",
      price: tradeRecommendation.conditions.price.toString(),
      stopLossOnFill: {
        price: tradeRecommendation.conditions.stopLoss.toString(),
      },
      takeProfitOnFill: {
        price: tradeRecommendation.conditions.takeProfit.toString(),
      },
    };

    return orderRequest;
  }

  throw new Error(`Couldn't generate an order from the provided trade recommendation.

Received the following trade recommendation:
${JSON.stringify(tradeRecommendation)}`);
}
