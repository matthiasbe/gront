/**
 * Controller permettant l'affichage des points de livraison sur un carte afin
 * que l'utilisateur puisse en sélectionner un.
 */

grontApp.controller('CycloCtrl', function ($scope, cart, data) {

  var ressources;

  /**
   * Fonction principale lancée dès que la page est chargée
   */
  var main = function() {

    // Ajout de la fonction update à la liste des fonctions 
    // appelée lors d'une mise à jour de la liste des triporteurs
    data.addUpdateCallback(update);

    // Mise à jour du stockage local
    data.sync();

    $scope.cart = cart.getProducts();

    // Clear les popup lors d'un clic sur la carte
    document.getElementById('map_img').addEventListener('click', hideAllPopups);

    passFunctionsToScope();
  }

  /**
   * Envoi les fonctions nécessaires au scope, pour qu'elles puissent
   * être directement utilisées.
   */
  var passFunctionsToScope = function() {
    $scope.format_time = format_time;
    $scope.specialEvent = specialEvent;
    $scope.showPopup = showPopup;
  }

  /* 
   * Récupère la liste des point de livraison depuis le stockage local et met a 
   * jour l'affichage des points de livraison.
   */
  var update = function() {
    ressources = data.getTriporteurs();
    passDeliveriesToScope(ressources.deliveries, 4);
  }

  /**
   * Envoi les points de livraison au scope.
   * Envoi uniquement ceux correspondant au jour de livraison renseigné en
   * argument. Ecrase l'ancienne liste de points de livraison du scope.
   */
  var passDeliveriesToScope = function(deliveries, day) {
    var deliveriesOfDay = Array();
    var j = 0;
    for(var i in deliveries) {
      del = deliveries[i];
      if(del.day_delivery == day) {
        deliveriesOfDay[j] = del;
        j++;
      }
    }
    $scope.cyclos = deliveriesOfDay;
  }


  /**
   * Cache tous les popups
   */
  var hideAllPopups = function() {
    var popups = document.getElementsByClassName('popup');
    var imgs = document.getElementsByClassName('marker');
    for(var i = 0; i<popups.length; i++) {
      popups.item(i).style.display = 'none';
      imgs.item(i).src = imgs.item(i).src.replace(/_selected/g, '_unselected');
    }
  }


  /**
   * Renvoi un string indiquant la plage horaire pendant laquelle la livraison est disponible
   * @param del Object L'object de type delivery dont on veut afficher l'horaire
   */
  var format_time = function(del) {
    return 'entre ' + del.hour_delivery_debut + 'H' + del.minute_delivery_debut + ' et ' +
      del.hour_delivery_fin + 'H' + del.minute_delivery_fin;
  };

  /**
   * Si le point de livraison correspond à un évènement spécial,
   * retourne l'attribut html du type data-week="numero_semaine"
   */
  var specialEvent = function(del) {
    if(del.specialEvent) {
      return 'data-week=' + del.weekNumberAdded;
    }
  }

  
  /**
   * Affiche un popup a partir de l'id de la livraison et du jour de la livraison.
   * @param id String Sous la forme <id_delivery>_<jour_livraison> (ex "1_6")
   */
  var showPopup = function(id) {
    hideAllPopups();
    document.getElementById('popup'+id).style.display = 'block';
    document.getElementById('img'+id).src = document.getElementById('img'+id).src.replace(/_unselected/g, '_selected');
  }

  /**
   * Cache tous les markers
   */
  var hideAllMarkers = function() {
      console.log('ok');
    var markers = document.getElementsByClassName('marker');
    for(var i = 0; i<markers.length; i++) {
      markers.item(i).style.display = 'none';
    }
  };


  /**
   * Fonction appelée lors de la sélection d'un autre jour sur le calendrier
   * @param dayNum Le numéro du jour dans la semaine (lundi = 0)
   */
  var changeDay = function (dayNum) {
    hideAllPopups();
    hideAllMarkers();

    var markers = document.getElementsByClassName('day' + dayNum);

    for(var i = 0; i<markers.length; i++) {

      if(!markers.item(i).hasAttribute("data-week") ||
          weekNumber == markers.item(i).getAttribute('data-week')) {

            markers.item(i).style.display = 'block';
          }
    }
  };

  // Exéction de la fonction principale
  main();

});
