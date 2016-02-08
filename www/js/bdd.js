myApp.factory('bdd', function() {
	// Using a factory to fetch requests from WordPress site using WP REST API

	var header = {
		// The string "user:password" might have to be encoded in base64
		'Authorization' : 'Basic user:password'
	};

	// Base url of the wp endpoint
	var url = "http://gront.fr/wp-json/wp/v2/";


	return {
		simpleReq: function () {
		    alert("ok");
			return true;
		}
	}
});
