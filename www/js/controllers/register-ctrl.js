grontApp.controller('InscriptionCtrl', function ($scope, bdd, user, $state) {
  // Subscribing of a user
  $scope.register = function (email) {

    if(user.isLogged()) {
      alert('Veuillez vous déconnecter pour pouvoir vous inscrire.');
    }

    bdd.emailAvailable(email).then(function(available) {
      if(available) {
        createUser(email);
      }
      else {
        alert('email déjà utilisée');
      }
    }, function () {
      alert('Vous n\'êtes pas connecté à internet');
    });
  }

  var createUser = function(email) {
    bdd.createCustomer(email).then(function (res) {
      if(res.err == false) {
        user.setLoggedUser(res.loggedUser);
        alert('Vous êtes connecté.');
        $state.go('home');
      }
    });
  }
});
