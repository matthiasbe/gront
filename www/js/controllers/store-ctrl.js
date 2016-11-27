grontApp.controller('StoreCtrl', function ($scope, bdd, data, $ionicLoading, $ionicPopup, cart, $state) {

  /**
   * When store page is loaded
   */
  var initStore = function() {
    alert('ok');
  }

	/**
   * Loads the products from WP and fills the bounded
   * variable $scope.products with the products in an array.
   */
  var loadProducts = function () {
    $scope.products = data.getProducts();
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
      {text: 'Valider la commande', type: 'button-positive', onTap: function() {$state.go('cyclo')}},
      {text: 'Ok'}
    ]
  };

  var orderProduct = function(product) {
    cart.addProduct(product);
    $ionicPopup.show(addedToCartPopup);
  };


  /*** Execution ***/
  data.sync();

  $scope.orderProduct = orderProduct;
  loadProducts();
});

