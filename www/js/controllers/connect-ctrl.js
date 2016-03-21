grontApp.controller('ConnectCtrl', function ($scope, bdd, user) {
  $scope.connect = function(email, password) {
    if(user.isLogged()) {
      alert('Vous êtes déjà connecté.');
    } else {
      bdd.getUser(email).then(function(res) {
        if(!res.err) {
          user.setLoggedUser(err.user);
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
