grontApp.controller('StoreCtrl', function ($scope, bdd) {
  $scope.products = bdd.getProducts();
});
