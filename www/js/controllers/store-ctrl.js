grontApp.controller('StoreCtrl', function ($scope, bdd, $ionicLoading) {
  //$scope.products = bdd.getProducts();
  $ionicLoading.show({
    template: 'Chargement de la boutique...'
  });
  setTimeout(function (){$ionicLoading.hide()}, 1000);
  bdd.getProducts().then(function (res) {
    $scope.products = res ? res:"No results";
  });
  bdd.getUsers().then(function (res) {
    $scope.users = res ? res:"No results";
  });
});

