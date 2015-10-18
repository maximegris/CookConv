// Factory des ingrédients
angular.module('ingredients.service', ['ionic', 'ngCordova']
).factory('Ingredients', function($ionicPlatform, $q, $log, $cordovaSQLite, $translate) {
  'use strict';
  // Détection WebView ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isWebView(),

  // Data pour le browser
  _ingredients = [{
    id: 1, name: 'Eau', masse_volumique : '1'
  }, {
    id: 2, name: 'Lait', masse_volumique : '1.030'
  }, {
    id: 3, name: 'Chocolat noir', masse_volumique : '1.2'
  }, {
    id: 4, name: 'Beurre', masse_volumique : '0.91'
  }, {
    id: 5, name: 'Farine de maïs', masse_volumique : '5'
  }];

  // Méthodes publiques
  var getIngredients = function() {

    $log.debug("Récupération des ingrédients");

    var q = $q.defer();

    if(_isWebView) {

      _ingredients = [];

      var dbQuery = "SELECT id, name_" +  $translate.use()  + ", masse_volumique FROM ingredients ORDER BY name_" +  $translate.use();

      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){

        if(res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            _ingredients.push({  id : res.rows.item(i).id , name : res.rows.item(i)["name_" +  $translate.use()] , masse_volumique : res.rows.item(i).masse_volumique });
          }

        }

        q.resolve(_ingredients);
      }, function (err) {
        alert("Error Get ingredients : "  + JSON.stringify(err));
      });

    } else {
      q.resolve(_ingredients);
    }

    return q.promise;
  };

  return {
    getIngredients:getIngredients
  };

});
