const { soma, mul } = require('../src/calc');

test('soma 2 + 3 = 5', () => {
  expect(soma(2, 3)).toBe(5);
});

test('multiplica 4 * 5 = 20', () => {
  expect(mul(4, 5)).toBe(20);
});
