function createOrderData(
  orderKey,
  orderTime,
  orderDelivererEmployee,
  orderDelivererNum,
  orderDrinks,
  orderMakerEmployee,
  orderMakerNum,
  orderDrinksAmount,
  orderStatus,
  orderTableNumber,
  orderTotalPrice,
  orderTablesStatistic,
) {
  return {
    orderKey,
    orderTime,
    orderDelivererEmployee,
    orderDelivererNum,
    orderMakerEmployee,
    orderMakerNum,
    orderDrinksAmount,
    orderStatus,
    orderTableNumber,
    orderTotalPrice,
    orderTablesStatistic,
    orderDrinks: Object.values(orderDrinks).map((drink) => ({
      drinkImage: drink.drinkImage,
      drinkId: drink.drinkId,
      drinkName: drink.drinkName,
      drinkAmount: drink.drinkAmount,
      drinkPrice: drink.drinkPrice,
      drinkTotalPrice: drink.drinkTotalPrice,
    })),
  };
}

export default createOrderData;
