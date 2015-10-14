// Factory des ingrédients
angular.module('ingredients.service', ['ionic', 'ngCordova']
).factory('Ingredients', function($ionicPlatform, $q, $log, $cordovaSQLite) {

  // Détection WebView ou non pour utiliser SQLite
  var _isWebView = ionic.Platform.isWebView();

  // Data pour le browser
  _ingredients = [{
    name: 'Eau'
  }, {
    name: 'Lait'
  }, {
    name: 'Chocolat'
  }, {
    name: 'Beurre'
  }, {
    name: 'Farine'
  }];

  // Méthodes publiques
  var getIngredients = function() {

      $log.debug("Récupération des ingrédients");

      if(_isWebView) {

      _ingredients = [];

      var dbQuery = "SELECT name_fr FROM ingredients ORDER BY name_fr";
      //$ionicPlatform.ready(function () { //TODO
      $cordovaSQLite.execute(_db, dbQuery)
      .then(function(res){

          if(res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
                _ingredients.push({ name : res.rows.item(i)["name_fr"] });
            }

          }
        }, function (err) {
          alert("Error " + err);
        });
      //}); //TODO

      }

      return _ingredients;
    };

    var remove = function(ingredient) {
      ingredients.splice(_ingredients.indexOf(ingredient), 1);
    };

    var get = function(ingredientId) {
      for (var i = 0; i < _ingredients.length; i++) {
        if (_ingredients[i].id === parseInt(ingredientId)) {
          return _ingredients[i];
        }
      }
      return null;
    };

    return {
        getIngredients:getIngredients,
        remove:remove,
        get:get
    };

});
