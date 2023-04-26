const calculator = require('./calculator');

describe('calculator', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(calculator(1, '+', 2)).toBe(3);
  });

  test('subtracts 2 - 1 to equal 1', () => {
    expect(calculator(2, '-', 1)).toBe(1);
  });

  test('multiplies 2 * 3 to equal 6', () => {
    expect(calculator(2, '*', 3)).toBe(6);
  });

  test('divides 6 / 2 to equal 3', () => {
    expect(calculator(6, '/', 2)).toBe(3);
  });

  test('returns "Cannot divide by zero" when dividing by 0', () => {
    expect(calculator(6, '/', 0)).toBe('Cannot divide by zero');
  });

  test('returns "Invalid operator" when using an invalid operator', () => {
    expect(calculator(6, '%', 2)).toBe('Invalid operator');
  });
});
