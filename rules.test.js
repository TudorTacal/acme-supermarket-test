const rules = require('./rules');

const { BOGOF, DISCOUNT } = rules;
describe('Rules', () => {
  test('BOGOF', () => {
    const expected = { type: 'BOGOF' };
    expect(BOGOF).toEqual(expected);
  });
  test('DISCOUNT', () => {
    const expected = { 
      type: 'DISCOUNT', 
      SR1: {
        price: 4.50,
        quantity: 3,
      },
      FR1: {},
      CF1: {},
    };
    expect(DISCOUNT).toEqual(expected);
  });
});
