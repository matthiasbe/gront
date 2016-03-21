grontApp.controller('InscriptionCtrl', function ($scope, bdd) {
  // Subscribing of a user
  $scope.register = function (email) {
    bdd.emailAvailable(email).then(function(available) {
      if(available) {
        createUser(email);
      }
      else {
        alert('email déjà utilisée');
      }
    }, function () {
      alert('Vous n\'êtes pas connecté');
    });
  }

  var createUser = function(email) {
    bdd.createCustomer(email);
  }
});
