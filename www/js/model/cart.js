/**
 * Contains the products put in the cart.
 */
grontApp.factory('cart', function() {
  var products = [];

  return {
    getProducts: function () {
      return products;
    },

    addProduct: function (product) {
      //TODO already in cart
      products.push(product);
    },

    removeProduct: function(product) {
      //TODO inexistant product
      var index = products.indexOf(product);
      products.slice(index, 1);
    }
  }
});
