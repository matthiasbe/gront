grontApp.controller('InscriptionCtrl', function ($scope, $rootScope, bdd) {

  // Subscribing of a user
  $scope.register = function () {

    // Checking email length
    // TODO check format
    //if ($scope.email.length < 3) {
    //  alert("L'adresse email est trop courte. Expected : > 3 Got : " + $scope.email.length);
    //  return null;
    //}
    // TODO : check first and last name

    bdd.userExists($scope.email).then(function(emailAlreadyRegistered) {

    })
  }
});
