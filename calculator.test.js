const { add, subtract, multiply } = require('./calculator');

describe('add', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('adds -1 + 2 to equal 1', () => {
    expect(add(-1, 2)).toBe(1);
  });

  test('adds 0.5 + 0.5 to equal 1', () => {
    expect(add(0.5, 0.5)).toBe(1);
  });
});

describe('subtract', () => {
  test('subtracts 2 - 1 to equal 1', () => {
    expect(subtract(2, 1)).toBe(1);
  });

  test('subtracts -2 - (-1) to equal -1', () => {
    expect(subtract(-2, -1)).toBe(-1);
  });

  test('subtracts 2.5 - 1.5 to equal 1', () => {
    expect(subtract(2.5, 1.5)).toBe(1);
  });
});

describe('multiply', () => {
  test('multiplies 2 * 3 to equal 6', () => {
    expect(multiply(2, 3)).toBe(6);
  });

  test('multiplies -2 * 3 to equal -6', () => {
    expect(multiply(-2, 3)).toBe(-6);
  });

  test('multiplies 2.5 * 0 to equal 0', () => {
    expect(multiply(2.5, 0)).toBe(0);
  });
});
