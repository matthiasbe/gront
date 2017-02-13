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

    // Clear les popup lors d'un clic sur la carte
    document.getElementById('map_img').addEventListener('click', hideAllPopups);

    passDaysToScope();
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
    $scope.changeDay = changeDay;
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
   * Fonction appelée lors de la sélection d'un autre jour sur le calendrier
   * @param dayNum Le numéro du jour dans la semaine (lundi = 0)
   */
  var changeDay = function (dayNum) {
    passDeliveriesToScope(ressources.deliveries, dayNum);
  };

  var nextDay = function(date) {
    date.setTime(date.getTime() + 24*60*60*1000);
    return date;
  }

  var passDaysToScope = function() {
    var currentDay = new Date();
    if(currentDay.getHours() > 9) {
      currentDay  = nextDay(currentDay);
    }

    var days = Array();
    for(var i = 0; i < 10; i++) {
      days[i] = {name: currentDay.toDateString(), number: currentDay.getDay()};
      currentDay = nextDay(currentDay);
    }
    $scope.days = days;
  }

  // Exéction de la fonction principale
  main();

});
