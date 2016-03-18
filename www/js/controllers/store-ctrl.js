grontApp.controller('StoreCtrl', function ($scope, bdd, $ionicLoading) {
  //$scope.products = bdd.getProducts();
  $ionicLoading.show({
    template: 'Chargement de la boutique...'
  });
  bdd.getProducts().then(function (res) {
    $scope.products = res ? res:"No results";
    $ionicLoading.hide();
  });
});

