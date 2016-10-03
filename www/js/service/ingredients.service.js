// Factory des ingrédients
(function (angular, undefined) {
  'use strict'

  angular.module('services').factory('IngredientsFactory', IngredientsFactory)

  IngredientsFactory.$inject = ['$q', '$log', '$translate', '$cordovaSQLite']

  /* @ngInject */
  function IngredientsFactory($q, $log, $translate, $cordovaSQLite) {
    // Méthodes publiques
    var getIngredients = function (language) {
      var q = $q.defer()

      var _ingredients = []

      var dbQuery = 'SELECT id, name_' + language + ', masse_volumique FROM ingredients ORDER BY name_' + language

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              _ingredients.push({
                id: res.rows.item(i).id,
                name: res.rows.item(i)['name_' + language],
                masse_volumique: res.rows.item(i).masse_volumique
              })
            }
          }

          q.resolve(_ingredients)
        }, function (err) {
          window.alert('Error Get ingredients : ' + JSON.stringify(err))
        })

      return q.promise
    }

    var getIngredientsByRef = function (ref) {
      var q = $q.defer()

      var _ingredients = []

      var dbQuery = 'SELECT id, name_' + $translate.use() + ', masse_volumique FROM ingredients WHERE ref = ' + ref + ' ORDER BY name_' + $translate.use()

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              _ingredients.push({
                id: res.rows.item(i).id,
                name: res.rows.item(i)['name_' + $translate.use()],
                masse_volumique: res.rows.item(i).masse_volumique
              })
            }
          }

          q.resolve(_ingredients)
        }, function (err) {
          window.alert('Error Get ingredients By Ref : ' + JSON.stringify(err))
        })

      return q.promise
    }

    var resetIngredients = function () {
      var q = $q.defer()

      var _ingredients = []

      var dbQuery = 'DELETE FROM ingredients WHERE ref <> "1"'

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          q.resolve()
        }, function (err) {
          window.alert('Error Reset ingredients : ' + JSON.stringify(err))
        })

      return q.promise
    }

    // Public interface
    return {
      getIngredients: getIngredients,
      getIngredientsByRef: getIngredientsByRef,
      resetIngredients: resetIngredients
    }
  }
})(angular);
