grontApp.controller('ConnectCtrl', function ($scope, $state, bdd, user, $ionicPopup) {
  $scope.connect = function(email, password) {
    if(user.isLogged()) {

      $ionicPopup.show({
        title: "Déjà connecté",
        template: 'Veuillez d\'abord vous déconnecter.',
        buttons: [
          {text: "Annuler"},
          {text: "Se déconnecter", type: "button-positive", onTap: function(){user.disconnect();}}]
      });

    } else {

      bdd.getUser(email).then(function(res) {
        if(res.userExists) {
          user.setLoggedUser(res.user);
          alert('Vous êtes connecté');
          $state.go('store');
        }
        else {
          alert('L\'adresse email n\'existe pas.');
        }
      }, function(err) {
        alert('Vous n\'êtes pas connecté à internet.');
      });

    }
  };
});
