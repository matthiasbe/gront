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

    // Ajout de la fonction update à la liste des fonctions
    // appelée lors d'une mise à jour de la liste des produits
    data.addUpdateCallback(update, false);

    // Mise à jour du stockage local
    data.sync();
  }

  /*
   * Récupère la liste des produits depuis le stockage local et met a
   * jour l'affichage des produits
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

  // Exécution de la fonction principale
  main();

});
