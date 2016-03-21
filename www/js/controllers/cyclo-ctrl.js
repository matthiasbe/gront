grontApp.controller('CycloCtrl', function ($scope, cart) {
  $scope.cart = cart.getProducts();

  $scope.cyclos = [
    {address: '25 rue du corbeau 15e arrondissement'},
    {address: '18 rue des 3 mouettes 8e arrondissement'},
    {address: '1 rue de l\'étoile 3e arrondissement'}
  ];
});

