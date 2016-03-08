// Base url of the wp endpoint
// Here we use a proxy to test on localhost with ionic serve
var url = '/rest-api/wp-json/wp/v2/';

var wc = new WooCommerceAPI({
  url: 'http://localhost:8100/rest-api/',
  consumerKey: 'ck_aabd0e6985206e1ea8945e6d1f203bd6f88bd52c',
  consumerSecret: 'cs_c69ef1e13e5165daf06a717d5735665c230aa2fc'
});

var wp = new WP({
  endpoint: 'http://localhost:8100/rest-api/wp-json/',
  username : 'appmobile',
  password : 'Jc29JQi^5jtq@@yT($0)4e#('
});

grontApp.factory('bdd', function($http, $q) {
	// Using a factory to fetch requests from WordPress site using WP REST API

	return {
    getProducts: function() {
      wp.users().me().then(function(result) {
        console.log(result);
      });
    }
	}
});
