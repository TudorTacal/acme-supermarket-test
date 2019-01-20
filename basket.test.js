const Basket = require('./basket');
const createItem = require('./item');
const rules = require('./rules');

const { 
  BOGOF, 
  DISCOUNT, 
} = rules;

let FR1;
let SR1;
let CF1;

beforeEach(() => {
  FR1 = createItem('FR1', 'Fruit tea', 3.11);
  SR1 = createItem('SR1', 'Strawberries', 5.00);
  CF1 = createItem('CF1', 'Coffee', 11.23);
});

describe('Basket', () => {
  test('should be defined', () => {
    expect(Basket).toBeDefined();
  });

  test('should have an add() method', () => {
    const basket = new Basket();
    expect(basket.add).toBeDefined();
  });

  test('add() should add an item to the basket', () => {
    const addSpy = jest.spyOn(Basket.prototype, 'add');
    const basket = new Basket();
    basket.add(FR1);

    expect(addSpy).toHaveBeenCalledWith(FR1);
    expect(basket.items).toEqual([FR1]);
  });

  test('should have a total() method', () => {
    const basket = new Basket();
    expect(basket.total).toBeDefined();
  });

  test('total() should calculate the price of the items', () => {
    const basket = new Basket();
    basket.add(FR1);
    basket.add(SR1);
    basket.add(CF1);

    expect(basket.total()).toEqual('£19.34');
  });

  test('should apply the BOGOF rule', () => {
    const pricingRules = {
      bogof: BOGOF,
    };
    const basket = new Basket(pricingRules);
    basket.add(FR1);
    basket.add(SR1);
    basket.add(FR1);
    basket.add(CF1);

    expect(basket.total()).toEqual('£19.34');
  });

  test('should apply the BOGOF rule for multiple products', () => {
    const pricingRules = {
      bogof: BOGOF,
    };
    const basket = new Basket(pricingRules);
    basket.add(FR1);
    basket.add(SR1);
    basket.add(FR1);
    basket.add(CF1);
    basket.add(CF1);


    expect(basket.total()).toEqual('£19.34');
  });

  test('should apply the BOGOF rule for 4 FR1', () => {
    const pricingRules = {
      bogof: BOGOF,
    };
    const basket = new Basket(pricingRules);
    basket.add(FR1);
    basket.add(FR1);
    basket.add(FR1);
    basket.add(FR1);


    expect(basket.total()).toEqual('£6.22');
  });

  test('should apply the BOGOF rule for 2 FR1', () => {
    const pricingRules = {
      bogof: BOGOF,
    };
    const basket = new Basket(pricingRules);
    basket.add(FR1);
    basket.add(FR1);

    expect(basket.total()).toEqual('£3.11');
  });

  test('should apply the DISCOUNT rule', () => {
    const pricingRules = {
      discount: DISCOUNT,
    };
    const basket = new Basket(pricingRules);
    basket.add(SR1);
    basket.add(SR1);
    basket.add(FR1);
    basket.add(SR1);
    
    expect(basket.total()).toEqual('£16.61');
  });
});