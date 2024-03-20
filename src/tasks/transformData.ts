import { Order, OrdersFilters } from '../types';

export const transformData = (orders: Order[], filters: OrdersFilters | null = null) => {
  if (!filters) {
    return orders;
  }

  let updatedOrders = [...orders];

  if (filters.merge) {
    const orderMap = updatedOrders.reduce(
      (acc: Record<string, Order>, prev) => {
        if (!acc[prev.clientId]) {
          acc[prev.clientId] = prev;
        } else {
          acc[prev.clientId] = {
            clientId: prev.clientId,
            amount: acc[prev.clientId].amount + prev.amount,
            fruits: Array.from(
              new Set([...acc[prev.clientId].fruits, ...prev.fruits])
            ).sort((a, b) => a.localeCompare(b)),
          };
        }

        return acc;
      },
      {}
    );

    const mergedOrders = [];

    for (const key in orderMap) {
      const reversed = updatedOrders.reduceRight(
        (acc: Order[], prev) => [...acc, prev],
        []
      );
      const idx =
        updatedOrders.length -
        1 -
        reversed.findIndex(
          (order) => order.clientId === orderMap[key].clientId
        );
      mergedOrders[idx] = orderMap[key];
    }

    updatedOrders = mergedOrders.filter((item) => !!item === true);
  }

  if (filters.clientId) {
    updatedOrders = updatedOrders.filter(
      (order) => order.clientId === filters.clientId
    );
  }

  if (filters?.minAmount) {
    updatedOrders = updatedOrders.filter(
      (order) => order.amount >= filters.minAmount!
    );
  }

  if (filters?.fruits) {
    const filtered: Order[] = [];

    updatedOrders.forEach((order) => {
      const merged = [...order.fruits, ...filters.fruits!];
      const mergedUnique = Array.from(new Set(merged));

      if (merged.length !== mergedUnique.length) {
        filtered.push(order);
      }
    });

    updatedOrders = filtered;
  }

  return updatedOrders;
};
