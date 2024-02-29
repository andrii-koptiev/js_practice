import { transformData } from '../../tasks';
import { Order } from '../../types';

const orders: Order[] = [
  { clientId: 4, amount: 50, fruits: ['banana'] },
  { clientId: 1, amount: 40, fruits: ['apple', 'orange', 'grape', 'cherry'] },
  { clientId: 7, amount: 45, fruits: ['blueberry', 'kiwi'] },
  { clientId: 1, amount: 20, fruits: ['cherry', 'avocado', 'lemon'] },
  { clientId: 3, amount: 10, fruits: ['lime', 'apple', 'strawberry'] },
  { clientId: 4, amount: 20, fruits: ['banana', 'apple', 'lemon'] },
  { clientId: 1, amount: 10, fruits: ['cherry', 'orange', 'lemon'] },
];

describe('transformData', () => {
  test('should return empty array', () => {
    expect(transformData([])).toEqual([]);
    expect(transformData([], { clientId: 1 })).toEqual([]);
    expect(transformData([], { merge: true })).toEqual([]);
  });

  test('should return all orders without filters', () => {
    expect(transformData(orders)).toEqual(orders);
  });

  describe('clientId filter', () => {
    test('should work correct with client that have 1 order', () => {
      expect(transformData(orders, { clientId: 7 })).toEqual([
        { clientId: 7, amount: 45, fruits: ['blueberry', 'kiwi'] },
      ]);
    });

    test('should work correct with client that have multiply orders', () => {
      expect(transformData(orders, { clientId: 4 })).toEqual([
        { clientId: 4, amount: 50, fruits: ['banana'] },
        { clientId: 4, amount: 20, fruits: ['banana', 'apple', 'lemon'] },
      ]);
    });

    test('should return empty array with non-existing client', () => {
      expect(transformData(orders, { clientId: 99 })).toEqual([]);
    });
  });

  describe('minAmount filter', () => {
    test('should return filtered orders by amount', () => {
      expect(transformData(orders, { minAmount: 30 })).toEqual([
        { clientId: 4, amount: 50, fruits: ['banana'] },
        {
          clientId: 1,
          amount: 40,
          fruits: ['apple', 'orange', 'grape', 'cherry'],
        },
        { clientId: 7, amount: 45, fruits: ['blueberry', 'kiwi'] },
      ]);
    });

    test('should return emtpty array when no results found', () => {
      expect(transformData(orders, { minAmount: 200 })).toEqual([]);
    });
  });

  describe('fruits filter', () => {
    test('should return filtered 1 fruit specified', () => {
      expect(transformData(orders, { fruits: ['banana'] })).toEqual([
        { clientId: 4, amount: 50, fruits: ['banana'] },
        { clientId: 4, amount: 20, fruits: ['banana', 'apple', 'lemon'] },
      ]);
    });

    test('should return filtered multiple fruits specified', () => {
      expect(
        transformData(orders, { fruits: ['orange', 'apple', 'lemon'] })
      ).toEqual([
        {
          clientId: 1,
          amount: 40,
          fruits: ['apple', 'orange', 'grape', 'cherry'],
        },
        { clientId: 1, amount: 20, fruits: ['cherry', 'avocado', 'lemon'] },
        { clientId: 3, amount: 10, fruits: ['lime', 'apple', 'strawberry'] },
        { clientId: 4, amount: 20, fruits: ['banana', 'apple', 'lemon'] },
        { clientId: 1, amount: 10, fruits: ['cherry', 'orange', 'lemon'] },
      ]);
    });

    test('should return empty array non-existing fruit', () => {
      expect(transformData(orders, { fruits: ['non-existing fruit'] })).toEqual(
        []
      );
    });
  });

  describe('merge filter', () => {
    test('should merge as expected and postion of order should be as a last in order list. Fruits should be unique array and alphabeticaaly sorted', () => {
      expect(transformData(orders, { merge: true })).toEqual([
        { clientId: 7, amount: 45, fruits: ['blueberry', 'kiwi'] },
        { clientId: 3, amount: 10, fruits: ['lime', 'apple', 'strawberry'] },
        { clientId: 4, amount: 70, fruits: ['apple', 'banana', 'lemon'] },
        {
          clientId: 1,
          amount: 70,
          fruits: ['apple', 'avocado', 'cherry', 'grape', 'lemon', 'orange'],
        },
      ]);
    });
  });

  describe('multiple filters', () => {
    test('should merge and filter with minAmount and merge filters', () => {
      expect(transformData(orders, { minAmount: 35, merge: true })).toEqual([
        { clientId: 7, amount: 45, fruits: ['blueberry', 'kiwi'] },
        { clientId: 4, amount: 70, fruits: ['apple', 'banana', 'lemon'] },
        {
          clientId: 1,
          amount: 70,
          fruits: ['apple', 'avocado', 'cherry', 'grape', 'lemon', 'orange'],
        },
      ]);
    });

    test('should merge and filter with clientId and merge filters', () => {
      expect(transformData(orders, { clientId: 4, merge: true })).toEqual([
        { clientId: 4, amount: 70, fruits: ['apple', 'banana', 'lemon'] },
      ]);
    });
  });
});
