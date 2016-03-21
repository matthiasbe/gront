grontApp.controller('CycloCtrl', function ($scope, cart) {
  $scope.cart = cart.getProducts();
});

