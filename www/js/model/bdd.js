grontApp.factory('bdd', function($http, $q) {
  var wp = new WPAPI({
    endpoint: 'http://localhost/gront/?rest_route=',
      //endpoint: 'http://gront.fr/wp-json/',
      username : 'appmobile',
      password : 'Jc29JQi^5jtq@@yT($0)4e#('
        });
      wp.check = wp.registerRoute('custom', '/check/(?P<id>)/(?P<password>)');
      wp.triporteurs = wp.registerRoute('custom', '/triporteurs');


      // Using a factory to fetch requests from WordPress site using WP and WC REST APIs
      var wc = new WooCommerceAPI({
        consumerKey: 'ck_aabd0e6985206e1ea8945e6d1f203bd6f88bd52c',
          consumerSecret: 'cs_c69ef1e13e5165daf06a717d5735665c230aa2fc',
          //url: 'http://gront.fr'
          url: 'http://localhost:8100/rest-api/',
          proxy: 'http://gront.fr/'
      });

      return {

        /**
         * Check if this email is available. This is used for registration.
         */
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

        createCustomer: function(email) {
          var data = {"customer": {"email": email}};
          var res = $q.defer();

          wc.post('customers', data, function(err, data, results) {
            if(err == null) {
              res.resolve(JSON.parse(results).customer);
            } else {
              res.reject();
            }
          });

          return res.promise;
        },

        getProducts: function() {
          var res = $q.defer();
          wc.get('products', function(err, data, result) {
            if(err == null) {
              res.resolve(JSON.parse(result).products);
            }
            else {
              res.reject("Aucune connexion");
            }
          });
          return res.promise;
        },

        checkPassword: function(email, password) {
          var res = $q.defer();
          wp.check()
            .id(encodeURI(email))
            .password(encodeURIComponent(password))
            .get(function(err, data) {
              if(err == null) {
                res.resolve(data);
              }
              else {
                res.reject('Aucune connexion.');
              }
            });
          return res.promise;
        },

        getTriporteurs: function() {
          var res = $q.defer();
          wp.triporteurs()
            .get(function(err, data) {
              if(err == null) {
                res.resolve(data);
              }
              else {
                res.reject('Aucune connexion.');
              }
            });
          return res.promise;
        }
      }
});


