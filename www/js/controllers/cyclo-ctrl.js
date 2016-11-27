grontApp.controller('CycloCtrl', function ($scope, cart, data) {

  var ressources;

  var update = function() {
    ressources = data.getTriporteurs();
    $scope.cyclos = ressources.deliveries;
  }

  data.addUpdateCallback(update);
  data.sync();
  update();

  $scope.cart = cart.getProducts();

});

