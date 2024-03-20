import { debounce } from '../../polyfills';

describe('debounce function should return expected results', () => {
  test('should be executed after duration', (done) => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 10);

    expect(i).toBe(0);
    increment();
    expect(i).toBe(0);

    setTimeout(() => {
      expect(i).toBe(1);
      done();
    }, 20);
  });

  describe('should work with arguments', () => {
    test('called once', (done) => {
      let i = 35;
      const increment = debounce((a: number, b: number) => {
        i += a * b;
      }, 10);

      expect(i).toBe(35);
      increment(5, 7);
      expect(i).toBe(35);

      setTimeout(() => {
        expect(i).toBe(70);
        done();
      }, 20);
    });
  });

  test('should be executed 1 time even after calling it multiple times', (done) => {
    let i = 0;
    const increment = debounce(() => {
      i++;
    }, 20);

    expect(i).toBe(0);
    increment();
    increment();
    increment();
    increment();
    expect(i).toBe(0);

    // Should not fire yet.
    setTimeout(() => {
      expect(i).toBe(0);
    }, 10);

    setTimeout(() => {
      expect(i).toBe(1);
      done();
    }, 30);
  });
});
