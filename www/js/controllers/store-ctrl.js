grontApp.controller('StoreCtrl', function ($scope, bdd, $ionicLoading, $ionicPopup, cart, $state) {

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

  var addedToCartPopup = {
    title: 'Panier',
    template: 'Le produit à bien été ajouté au panier.',
    buttons: [
      //{text: 'Accéder au panier', type: 'button-positive', onTap: function() {$state.go('cart')}},
      {text: 'Valider la commande', type: 'button-positive', onTap: function() {$state.go('cyclo')}},
      {text: 'Ok'}
    ]
  };

  $ionicLoading.show({
    template: 'Chargement de la boutique...'
  });

  var orderProduct = function(product) {
    cart.addProduct(product);
    $ionicPopup.show(addedToCartPopup);
  };

  $scope.orderProduct = orderProduct;
  loadProducts();
});

