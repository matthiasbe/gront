grontApp.controller('StoreCtrl', function ($scope, bdd, $ionicLoading, $ionicPopup) {

  var loadProducts = function () {
    bdd.getProducts().then(function (res) {
      $scope.products = res.data;
      if(res.err) {
        $ionicPopup.show(connectionErrorPopup(res.err));
      }
      $ionicLoading.hide();
    });
  };

  var connectionErrorPopup = function (error) {
    return {
      title: 'Erreur de connexion',
        template: error,
      scope: $scope,
      buttons: [
        {text: 'Annuler'},
        {
          text: 'Réessayer',
          type: 'button-positive',
          onTap: loadProducts
        }
      ]
    }
  };

  $ionicLoading.show({
    template: 'Chargement de la boutique...'
  });

  loadProducts();
});

