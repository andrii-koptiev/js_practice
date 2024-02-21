import { promiseAll } from '../../polyfills';

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve('2');

test('should have result in expected order', async () => {
  const result = await promiseAll([promise1, promise2]);

  expect(result).toEqual([1, '2']);
});
