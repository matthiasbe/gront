// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var grontApp = angular.module('starter', ['ionic']);

grontApp.run(function ($ionicPlatform) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

grontApp.controller('ConnexionCtrl', function ($scope) {

});

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

grontApp.config(function ($stateProvider, $urlRouterProvider) {
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

  $stateProvider.state('store', {
    url: '/store',
    templateUrl: 'templates/store.html',
    controller: 'StoreCtrl'
  });

  $urlRouterProvider.otherwise('/home');
});
