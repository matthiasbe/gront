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

grontApp.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'templates/home.html'
  });

  $stateProvider.state('inscription', {
    url: '/inscription',
    templateUrl: 'templates/inscription.html',
    controller: 'InscriptionCtrl'
  });

  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'templates/main.html',
    controller:'MainCtrl'
  });

  $stateProvider.state('connexion', {
    url: '/connexion',
    templateUrl: 'templates/connexion.html',
    controller: 'ConnectCtrl'
  });

  $stateProvider.state('store', {
    url: '/store',
    templateUrl: 'templates/store.html',
    controller: 'StoreCtrl'
  });

  $stateProvider.state('cyclo', {
    url: '/cyclo',
    templateUrl: 'templates/cyclo.html',
    controller: 'CycloCtrl'
  });

  $stateProvider.state('cart', {
    url: '/cart',
    templateUrl: 'templates/cart.html'
  });

  $stateProvider.state('concept', {
    url: '/concept',
    templateUrl: 'templates/concept.html'
  })

  $stateProvider.state('traiteur', {
    url: '/traiteur',
    templateUrl: 'templates/traiteur.html'
  })

  $stateProvider.state('contact', {
    url: '/contact',
    templateUrl: 'templates/contact.html'
  })

  $stateProvider.state('orderConfirmed', {
    url: '/orderConfirmed',
    templateUrl: 'templates/orderConfirmed.html'
  })

  $stateProvider.state('genericCarte', {
    url: '/genericCarte',
    templateUrl: 'templates/genericCarte.html',
    controller: 'GenericCarteCtrl'
  })

  $stateProvider.state('paiement', {
    url: '/paiement',
    templateUrl: 'templates/paiement.html',
    controller: 'PaiementCtrl'
  })

  $stateProvider.state('carte', {
    url: '/carte',
    templateUrl: 'templates/carte.html'
  })

  $stateProvider.state('map', {
    url: '/map',
    templateUrl: 'templates/map.html'
  })

  $stateProvider.state('test', {
    url: '/test',
    templateUrl: 'templates/test.html'
  })
  $urlRouterProvider.otherwise('/home');
});
