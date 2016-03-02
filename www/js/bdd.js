grontApp.factory('bdd', function($http, $q) {
	// Using a factory to fetch requests from WordPress site using WP REST AP

	var config = {
		header : {
			// The string "user:password" might have to be encoded in base64
			'Authorization' : 'Basic ' + 'appmobile:Jc29JQi^5jtq@@yT($0)4e#('
		}

	};

	// Base url of the wp endpoint
	// Here we use a proxy to test on localhost with ionic serve
	var url = '/rest-api/';

	// Patterns for requests
	function getRequest(urlAdd) {
    var res = $q.defer();
		$http.get(url + urlAdd)
			.then(function successCallback(response) {
          res.resolve(response);
				},
				function errorCallback(response) {
					//TODO properly handle request errors
					alert("Request failed.");
          res.resolve(response);
				});

    return res.promise;
	}

	return {
		/**
     * @returns The list of registered users in the WordPress database in JSON format.
     */
    getUsers: function () {
      return getRequest('users').then(function(users) {
        return users['data'];
      });
		},

		/**
     * @param email The email address of the user we one want to return.
     * @returns A user from the WordPress database in JSON format.
     */
    getUser: function(email) {
      return this.getUsers().then(function(users) {
        console.log(users);
        for(var i = 0; i < users.length; i++) {
          if(users[i].email == email) {
            alert(JSON.stringify(users[i]));
            return users[i];
          }
        }
        return null;
      });

    },

    userExists: function(email) {
      return this.getUser(email).then(function(user) {
        return user != null;
      });
    }

	}
});
