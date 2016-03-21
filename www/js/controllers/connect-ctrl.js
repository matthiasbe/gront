grontApp.controller('ConnectCtrl', function ($scope, $state, bdd, user) {
  $scope.connect = function(email, password) {
    if(user.isLogged()) {
      alert('Vous êtes déjà connecté.');
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
