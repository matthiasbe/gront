/**
 * Contains the logged user
 */
grontApp.factory('user', function() {
  var user = null;

  return {
    isLogged: function(){
      return user == null;
    },

    setLoggedUser: function(user) {
      user = user;
    },

    getLoggedUser: function () {
      return user;
    }
  }
});
