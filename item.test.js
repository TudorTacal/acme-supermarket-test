const createItem = require('./item');

describe('createItem()', () => {
  test('should return an object', () => {
    expect(createItem()).toEqual({});
  });

  test('should return an object with Product Code, Name and Price', () => {
    const productCode = 'FR1';
    const name = 'Fruit tea';
    const price = 3.11;
    const expected = {
      productCode,
      name,
      price
    };

    const item = createItem(productCode, name, price);

    expect(item).toEqual(expected)
  });
});