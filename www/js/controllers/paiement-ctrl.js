grontApp.controller('PaiementCtrl', function ($scope, $state, cart, data) {
  

  /**
   * Fonction principale
   */
  var main = function() {
    passFunctionsToScope();
  }

  /**
   * Envoi les fonctions nécessaires au scope, pour qu'elles puissent
   * être directement utilisées.
   */
  var passFunctionsToScope = function() {
    $scope.send = send;
  }


  /**
   * Envoi du formulaire de paiement
   */
  var send = function() {

  }

  // Exéction de la fonction principale
  main();

});

