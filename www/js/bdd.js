myApp.factory('bdd', function($http, $q) {
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
	function reqGet(urlAdd) {
    res = $q.defer();
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
		getUsers: function () {
			return reqGet('users');
		},
    getUser: function(email) {
      return reqGet('users/'+email);
    }
	}
});
