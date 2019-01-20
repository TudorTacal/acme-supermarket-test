const rules = require('./rules');

class Basket {
  constructor(pricingRules = []) {
    this.pricingRules = pricingRules;
    this.items = [];
    this.currency = '£';
  }

  add(item) {
    this.items.push(item);
  }

  total() {
    const itemCount = this._countItems(this.items);
    const totalPrice = this._calculateTotal(this.items, itemCount, this.pricingRules);
    return this._formatTotal(this.currency, totalPrice);
  }

  _calculateTotal(items, itemCount = [], pricingRules = {}) {
    const { bogof, discount } = pricingRules;
    if (bogof) items = this._applyBogof(items, itemCount);
    if (discount) this._applyDiscount(items, itemCount, discount);
    return this._sumPrice(items);
  }

  _countItems(items) {
    return items.reduce((acc, item) => {
      const { productCode } = item;
      if(!acc[productCode]) {
        acc[productCode] = 0;
      }
      acc[productCode]++;
      return acc;
    }, {});
  }

  _formatTotal(currency, totalPrice) {
    return `${currency}${totalPrice}`;
  }
  
  _setPrice(item, price) {
    item.price = price;
  }

  _sumPrice(items) {
    return items.reduce((total, item) => total + item.price, 0);
  }

  _applyBogof(items, itemCount) {
    let added = { CF1: 0, FR1: 0, SR1: 0 };
    return items.filter((item) => {
      const nrOfItems = itemCount[item.productCode];
      const nrOfItemsToAdd = nrOfItems / 2 + nrOfItems % 2;
      const oneItem = nrOfItems === 1;
      const itemsToAdd = nrOfItemsToAdd >= 1 && added[item.productCode] < nrOfItemsToAdd; 
 
      if (oneItem || itemsToAdd ) { added[item.productCode]++; return true; }
      return false;
    })
  }

  _applyDiscount(items, itemCount, discount) {
    return items.forEach(item => {
      const { productCode } = item;
      const discountValues = discount[productCode];
      const discountedItem = productCode in discount;
      const discountQuantity = itemCount[productCode] >= discountValues.quantity;

      if (discountedItem && discountQuantity) 
        this._setPrice(item, discountValues.price);
      return item;
    });
  }
}

module.exports = Basket;
