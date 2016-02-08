myApp.factory('bdd', function($http) {
	// Using a factory to fetch requests from WordPress site using WP REST AP

	var config = {
		header : {
			// The string "user:password" might have to be encoded in base64
			'Authorization' : 'Basic ' + 'user:password'
		}

	};

	// Base url of the wp endpoint
	// Here we use a proxy to test on localhost with ionic serve
	var url = '/rest-api/';

	// Patterns for requests
	function reqGet(name) {
		$http.get(url + name)
			.then(function successCallback(response) {
					return response;
				},
				function errorCallback(response) {
					//TODO properly handle request errors
					alert("Request failed.");
					return null;
				});
	}

	return {
		simpleReq: function () {
			return reqGet('users/5');
		}
	}
});
