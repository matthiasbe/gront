/**
 * Page de connexion
 *
 * Fonctionnement de la connexion à partir d'identifiants du site wordpress :
 *
 */

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

      bdd.checkPassword(email, password).then(function(res) {
          if(!res.err) {
              if(res.data.status == 0) {
                console.log("Authorized to connect");
              }
              else if(res.data.status == 2) {
                  console.error("Unauthorize to connect");
              }
              else {
                  console.error("Internal server error");
              }
          }
      }, function(err) {
        alert('Vous n\'êtes pas connecté à internet.');
      });

    }
  };
});
