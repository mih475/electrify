exports.calcOrderTotal = function(products, productTotal) {
  return products.reduce(function(a, b) {
    return a + b[productTotal];
  }, 0);
};
