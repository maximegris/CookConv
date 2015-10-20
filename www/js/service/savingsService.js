// Factory des sauvergardes
angular.module('savings.service', ['ionic', 'ngCordova']
).factory('Savings', function($ionicPlatform, $q, $log, $cordovaSQLite, $translate) {
  'use strict';

  // Détection WebView ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isWebView(),

  // Data pour le browser
  _savings = [{ id : "1", fromVal : "50", fromType : "Ml", toVal : "5", toType : "dL", ingredient : "Beure" },
  { id : "2", fromVal : "50", fromType : "Ml", toVal : "5", toType : "dL", ingredient : "Lait" },
  { id : "3", fromVal : "50", fromType : "Ml", toVal : "5", toType : "dL", ingredient : "Beure" },
  { id : "4", fromVal : "50", fromType : "Ml", toVal : "5", toType : "dL", ingredient : "Chocolat" }];

  // Méthodes publiques
  var getSavings = function() {

    var q = $q.defer();

    if(_isWebView) {

      _savings = [];

      var dbQuery = "SELECT s.id, i.name_" +  $translate.use()  + ", s.from_value, s.from_type, s.to_value, s.to_type FROM savings s INNER JOIN ingredients i ON i.id = s.ingredient ORDER BY s.id";

      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){
        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _savings.push({ id : res.rows.item(i).id , fromVal : res.rows.item(i).from_value, fromType : res.rows.item(i).from_type,
              toVal : res.rows.item(i).to_value, toType : res.rows.item(i).to_type, ingredient : res.rows.item(i)["name_" +  $translate.use()] });
            }

          }
          q.resolve(_savings);
        },
        function (err) {
          alert("Error get savings : " + JSON.stringify(err));
        });

      } // Fallback si pas de BDD disponible
      else {
        q.resolve(_savings);
      }

      return q.promise;

    };

    var addSaving = function(_saving) {

      var q = $q.defer();

      if(_isWebView) {

        var dbQuery = 'INSERT INTO savings(ingredient, from_value, from_type, to_value, to_type) VALUES (?,?,?,?,?)';

        $cordovaSQLite.execute(_db, dbQuery, [_saving.ingredient, _saving.fromVal, _saving.fromType, _saving.toVal , _saving.toType])
        .then(function() {
          q.resolve();
        },
        function(error) {
          q.reject(error);
        });

      } // Fallback si pas de BDD disponible
      else {
        q.resolve();
      }

      return q.promise;
    };

    return {
      getSavings:getSavings,
      addSaving:addSaving
    };

  });
