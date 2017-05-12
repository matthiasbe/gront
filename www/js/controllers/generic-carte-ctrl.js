/**
 * Controller permettant l'affichage des produits de la carte après
 * avoir choisi son triporteur
 */

grontApp.controller('GenericCarteCtrl', function ($scope, $state, cart, data) {

  /**
   * Fonction principale
   */
  var main = function() {

    update();

    // Mise à jour du stockage local
    data.sync();
  }

  /*
   * Récupère la liste des point de livraison depuis le stockage local et met a
   * jour l'affichage des points de livraison.
   */
  var update = function() {
    $scope.products = JSON.parse(window.localStorage.getItem('products'));
    categories = [];
    for (product of $scope.products) {
      if (categories.indexOf(product.categories[0].toString()) == -1) {
        categories.push(product.categories[0].toString())
      }
    }
    $scope.categories = categories;
  }

  // Exéction de la fonction principale
  main();

});
