grontApp.controller('CycloCtrl', function ($scope, cart, data) {

  var ressources;

  /* 
   * Récupère la liste des triporteurs depuis le stockage local
   */
  var update = function() {
    ressources = data.getTriporteurs();
    $scope.cyclos = ressources.deliveries;
  }

  var groupbyday = function(deliveries) {
    var grouped = Array();
    console.log(deliveries);
    for(var i = 0; i < deliveries.length; i++) {
      console.log(deliveries[i]);
      grouped[deliveries[i].day_delivery].push(deliveries[i]);
    }
    console.log(grouped);
    return grouped;
  }
  // Ajout de la fonction update à la liste des fonctions appelée lors d'une mise à jour de la liste des triporteurs
  data.addUpdateCallback(update);

  // Mise à jour du stockage local
  data.sync();

  // On récupère le résultat de la mise à jour
  update();




  // Variables liées au template
  

  $scope.cart = cart.getProducts();

  /**
   * Renvoi un string indiquant la plage horaire pendant laquelle la livraison est disponible
   */
  $scope.format_time = function(del) {
    return 'entre ' + del.hour_delivery_debut + 'H' + del.minute_delivery_debut + ' et ' +
      del.hour_delivery_fin + 'H' + del.minute_delivery_fin;
  };

  /**
   * Si le point de livraison correspond à un évènement spécial, retourne l'attribut html du type
   * data-week="numero_semaine"
   */
  $scope.specialEvent = function(del) {
    if(del.specialEvent) {
      return 'data-week=' + del.weekNumberAdded;
    }
  }

  // Fonction d'affichage des popup

  $scope.showPopup = function(id) {
    hideAllPopups();
    document.getElementById('popup'+id).style.display = 'block';
    document.getElementById('img'+id).src = document.getElementById('img'+id).src.replace(/_unselected/g, '_selected');
  }

  var hideAllPopups = function() {
    var popups = document.getElementsByClassName('popup');
    var imgs = document.getElementsByClassName('marker');
    for(var i = 0; i<popups.length; i++) {
      popups.item(i).style.display = 'none';
      imgs.item(i).src = imgs.item(i).src.replace(/_selected/g, '_unselected');
    }
  }




});
