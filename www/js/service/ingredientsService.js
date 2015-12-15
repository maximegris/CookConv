// Factory des ingrédients
angular.module('ingredients.service', ['ionic', 'ngCordova']
).factory('Ingredients', function($q, $log, $cordovaSQLite) {
  'use strict';

  // Méthodes publiques
  var getIngredients = function(language) {

    var q = $q.defer();

    var _ingredients = [];

    var dbQuery = "SELECT id, name_" +  language  + ", masse_volumique FROM ingredients ORDER BY name_" +  language;

    $cordovaSQLite.execute(_db, dbQuery)
    .then(function(res){

      if(res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          _ingredients.push({  id : res.rows.item(i).id , name : res.rows.item(i)["name_" + language] , masse_volumique : res.rows.item(i).masse_volumique });
        }
      }

      q.resolve(_ingredients);
    }, function (err) {
      alert("Error Get ingredients : "  + JSON.stringify(err));
    });


    return q.promise;
  };

  // Public interface
  return {
    getIngredients:getIngredients
  };

});
