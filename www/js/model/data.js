/**
 * data est utilisé pour la gestion des données offline de l'appli.
 * Cela comprend leur téléchargement depuis le site wordpress, et les
 * accesseurs qui seront appelés par le controlleur
 */


grontApp.factory('data', function(bdd) {

  var storage = window.localStorage;
  var timer = null;
  var changeToSoft = false;
  var empty = true;
  var triporteursCallbacks = new Array();
  var productsCallbacks = new Array();

  /**
   * Cancels the current sync
   */
  var clearSync = function() {
    if(timer){
      clearInterval(timer);
    }
  };

  /**
   * Launched an attempt to download resources repeatedly (pretty often)
   * Cancel if another sync has be launched
   */
  var softSync = function() {
    clearSync();
    timer = setInterval(downloadResources, 60*1000);
  };

  /**
   * Launched an attempt to download resources repeatedly (very often)
   * Cancel if another sync has be launched
   */
  var hardSync = function() {
    clearSync();
    timer = setInterval(downloadResources, 1000);
  }

  var downloadResources = function() {
    // Two resources to sync :
    // * Triporteurs
    // * Products

    // First, triporteurs
    bdd.getTriporteurs().then(function(res) {
      storage.setItem('triporteurs', JSON.stringify(res));
      if(empty) {
        changeToSoft = true;
      }
      triggerTriporteursCallbacks();
    });

    // Then get products
    bdd.getProducts().then(function(res) {
      console.log(res);
      storage.setItem('products', JSON.stringify(res));
      if(empty) {
        changeToSoft = true;
      }
    });

    if(changeToSoft) {
      // Download was a success, changing to a softer pace of download
      changeToSoft = false;
      empty = false;
      softSync();
    }
  }

  /**
   * Execute all registered callback function for triporteurs
   */
  var triggerTriporteursCallbacks = function() {
    for(var i = 0; i < triporteursCallbacks.length; i++) {
      triporteursCallbacks[i]();
    }
  }

  return {

    /**
     * Launch synchronization with remote REST servers
     */
    sync: function() {
      if(empty) {
        hardSync();
      } else {
        softSync();
      }
    },

    /*
     *
     */
    getTriporteurs: function() {
      return JSON.parse(storage.getItem('triporteurs'));
    },

    getProducts: function() {
      return JSON.parse(storage.getItem('products'));
    },

    /**
     * Give function to call when the ressources a updated in local storage
     */
    addUpdateCallback: function(callback, triporteur = true) {
      triporteur ? triporteursCallbacks.push(callback) : productsCallbacks.push(callback);
    },
  }
});
