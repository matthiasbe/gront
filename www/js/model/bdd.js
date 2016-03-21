grontApp.factory('bdd', function($http, $q) {
  var wp = new WP({
    endpoint: 'http://localhost:8100/rest-api/wp-json/',
    //endpoint: 'http://gront.fr/wp-json/',
    username : 'appmobile',
    password : 'Jc29JQi^5jtq@@yT($0)4e#('
  });

	// Using a factory to fetch requests from WordPress site using WP and WC REST APIs
  var wc = new WooCommerceAPI({
    consumerKey: 'ck_aabd0e6985206e1ea8945e6d1f203bd6f88bd52c',
    consumerSecret: 'cs_c69ef1e13e5165daf06a717d5735665c230aa2fc',
    //url: 'http://gront.fr'
    url: 'http://localhost:8100/rest-api/',
    proxy: 'http://gront.fr/'
  });

	return {

    emailAvailable: function(email) {
      var available = $q.defer();
      wc.get('customers/email/'+email, function(err, data, results) {
        if(err != null) {
          available.reject();
        }
        else if(data.statusCode == 200) {
          available.resolve(false);
        }
        else if(data.statusCode == 404) {
          available.resolve(true);
        }
      });
      return available.promise;
    },

    getUser: function(email) {
      var user = $q.defer();
      wc.get('customers/email/'+email, function(err, data, results) {
        if(err != null) {
          user.reject();
        }
        else if(data.statusCode == 200) {
          user.resolve({userExists: true, user: JSON.parse(results).customer});
        }
        else if(data.statusCode == 404) {
          user.resolve({userExists: false, user: null});
        }
      });
      return available.promise;
    },

    createCustomer: function(email) {
      var data = {"customer": {"email": email}};
      var res = $q.defer();

      wc.post('customers', data, function(err, data, results) {
        if(err == null) {
          res.resolve({err: false, loggedUser: JSON.parse(results).customer});
        } else {
          res.resolve({err: err, loggedUser: null});
        }
      });

      return res.promise;
    },

    getProducts: function() {
      var res = $q.defer();
      wc.get('products', function(err, data, result) {
        if(err == null) {
          res.resolve({data: JSON.parse(result).products, err: false});
        }
        else {
          res.resolve({data: [], err: 'Aucune connexion.'});
        }
      });
      return res.promise;
    }
	}
});
