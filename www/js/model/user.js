/**
 * Contains the logged user
 */
grontApp.factory('user', function() {
  var someoneIsLogged = false;
  var user;

  return {
    isLogged: function(){
      return someoneIsLogged;
    },

    setLoggedUser: function(user) {
      someoneIsLogged = true;
      user = user;
    },

    getLoggedUser: function () {
      return user;
    },

    disconnect: function() {
      someoneIsLogged = false;
    }
  }
});
