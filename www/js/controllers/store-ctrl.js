grontApp.controller('StoreCtrl', function ($scope, bdd, $ionicLoading, $ionicPopup, cart, $state) {

	/**
   * Loads the products from WP and fills the bounded
   * variable $scope.products with the products in an array.
   */
  var loadProducts = function () {
    bdd.getProducts().then(function (res) {
      $scope.products = res.data;
      if(res.err) {
        $ionicPopup.show(connectionErrorPopup(res.err));
      }
      $ionicLoading.hide();
    });
  };

  /***  Popups  ***/

  var connectionErrorPopup = function (error) {
    return {
      title: 'Erreur de connexion',
      template: error,
      buttons: [
        {text: 'Annuler'},
        {text: 'Réessayer', type: 'button-positive', onTap: loadProducts}]};
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

  /*** Execution ***/

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

