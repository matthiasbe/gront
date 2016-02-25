// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var myApp = angular.module('starter', ['ionic'])

myApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

myApp.controller('ConnexionCtrl',function($scope){

});

myApp.controller('InscriptionCtrl',function($scope, $rootScope, bdd){

  // Subscribing of a user
	$scope.register = function() {

    // Checking email length
    // TODO check format
    if($scope.email.length < 3) {
      alert("L'adresse email est trop courte. Expected : > 3 Got : " + $scope.email.length);
      return null;
    }
    // TODO : check first and last name

    // Fetching the list of users
    bdd.getUsers().then(

      // If the request is successful : loop over users
      // and verify none have the same email address (used as id)
      function(requestResults) {
        var users = requestResults['data'];
        for(var i in users) {
          if(users[i] == $rootScope.email) {
            alert("Cette adresse email est déjà utilisée.");
          }
        }
      },
      function(err) {
        alert("Error while fetching user list.")
      }
    );
	}
});

myApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'templates/home.html'
	});

	$stateProvider.state('page1', {
		url: '/page1',
		templateUrl: 'templates/page1.html'
	});

	$stateProvider.state('inscription', {
		url: '/inscription',
		templateUrl: 'templates/inscription.html',
		controller: 'InscriptionCtrl'
	});

	$stateProvider.state('connexion', {
		url: '/connexion',
		templateUrl: 'templates/connexion.html',
		controller: 'ConnexionCtrl'
	});

	$urlRouterProvider.otherwise('/home');
});
