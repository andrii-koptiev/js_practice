import { deepEqual } from './polyfills';

const a = { age: 2 };
const b = {
  age: 2,
};
const c = [1, [2, 7]];
const d = [1, [2, 7]];

const e = {
  age: 2,
  name: 'John',
  lastName: 'Smith',
  adress: {
    zip: 34232,
  },
};
const f = {
  age: 2,
  name: 'John',
  lastName: 'Smith',
  adress: {
    zip: 34232,
  },
};

const mainApp = () => {
  console.log(deepEqual(e, f));
};

mainApp();
