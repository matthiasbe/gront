/**
 * Contains the products put in the cart.
 */
grontApp.factory('cart', function() {
  var products = [];

  return {
    getProducts: function () {
      return products;
    },

    addProduct: function (productId) {
      //TODO already in cart
      products.push(productId);
    },

    removeProduct: function(productId) {
      //TODO inexistant product
      var index = products.indexOf(productId);
      products.slice(index, 1);
    }
  }
});
