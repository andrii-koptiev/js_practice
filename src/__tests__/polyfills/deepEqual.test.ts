import { deepEqual } from '../../polyfills';

const num1 = 1;
const str1 = '1';
const num2 = 1;
const arr1 = [1, '4'];
const arr2 = [1, '7'];
const arr3 = [1, '7'];

const deepArr1 = [1, ['7', 5]];
const deepArr2 = [1, ['7', 5]];

const obj1 = {
  name: 'John',
};

const obj2 = {
  name: 'Pete',
};

const deepObj1 = {
  name: 'John',
  address: {
    zip: 34232,
  },
};

const deepObj2 = {
  name: 'John',
  address: {
    zip: 34232,
  },
};

describe('deepEqual function should return expected results', () => {
  it('should work correct with string and number', () => {
    const result = deepEqual(num1, str1);

    expect(result).toBeFalsy();
  });

  it('should work correct with equal values', () => {
    const result = deepEqual(num1, num2);

    expect(result).toBeTruthy();
  });

  it('should work correct with null args', () => {
    const result = deepEqual(null, null);

    expect(result).toBeTruthy();
  });

  it('should work correct with undefined and null', () => {
    const result = deepEqual(null, undefined);

    expect(result).toBeFalsy();
  });

  it('should work correct with non-equal arrays', () => {
    const result = deepEqual(arr1, arr2);

    expect(result).toBeFalsy();
  });

  it('should work correct with equal arrays', () => {
    const result = deepEqual(arr2, arr3);

    expect(result).toBeTruthy();
  });

  it('should work correct with nested array', () => {
    const result = deepEqual(deepArr1, arr3);

    expect(result).toBeFalsy();
  });

  it('should work correct with equal nested arrays', () => {
    const result = deepEqual(deepArr1, deepArr2);

    expect(result).toBeTruthy();
  });

  it('should work correct with objects', () => {
    const result = deepEqual(obj1, obj2);

    expect(result).toBeFalsy();
  });

  it('should work correct with objects', () => {
    const result = deepEqual(deepObj1, deepObj2);

    expect(result).toBeTruthy();
  });
});
