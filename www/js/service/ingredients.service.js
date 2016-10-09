(function (angular, undefined) {
  'use strict'

  angular.module('services').factory('IngredientsFactory', IngredientsFactory)

  IngredientsFactory.$inject = ['$q', '$log', '$translate', '$cordovaSQLite']

  /* @ngInject */
  function IngredientsFactory($q, $log, $translate, $cordovaSQLite) {
    return {
      getIngredients: getIngredients,
      getIngredientsByRef: getIngredientsByRef,
      resetIngredients: resetIngredients,
      createUserIngredient: createUserIngredient,
      updateUserIngredient: updateUserIngredient,
      removeUserIngredient: removeUserIngredient
    }

    function getIngredients(language) {
      var q = $q.defer()

      var _ingredients = []

      var dbQuery = 'SELECT id, name_' + language + ', masse_volumique, ref FROM ingredients ORDER BY name_' + language

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              _ingredients.push({
                id: res.rows.item(i).id,
                name: res.rows.item(i)['name_' + language],
                masse_volumique: res.rows.item(i).masse_volumique,
                ref: res.rows.item(i).ref
              })
            }
          }

          q.resolve(_ingredients)
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function getIngredientsByRef(ref) {
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
          q.reject(err)
        })

      return q.promise
    }

    function resetIngredients() {
      var q = $q.defer()

      var dbQuery = 'DELETE FROM ingredients WHERE ref <> 1'

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          q.resolve()
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function createUserIngredient(record) {
      var q = $q.defer()

      var dbQuery = 'INSERT INTO ingredients(masse_volumique ,ref, name_de, name_en, name_es, name_fr, name_pt, name_zh)  VALUES (?,?,?,?,?,?,?,?)'

      $cordovaSQLite.execute(window._db, dbQuery, [record.masse_volumique, 0, record.name, record.name, record.name, record.name, record.name, record.name])
        .then(function (res) {
          q.resolve()
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function updateUserIngredient(record) {
      var q = $q.defer()

      var dbQuery = 'UPDATE ingredients SET masse_volumique = ?, name_de = ?, name_en = ?, name_es = ?, name_fr = ?, name_pt = ?, name_zh = ? WHERE id = ? AND ref = ?'

      $cordovaSQLite.execute(window._db, dbQuery, [record.masse_volumique, record.name, record.name, record.name, record.name, record.name, record.name, record.id, 0])
        .then(function (res) {
          q.resolve()
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function removeUserIngredient(ingredient) {
      var q = $q.defer()

      var dbQuery = 'DELETE FROM ingredients WHERE id =' + ingredient.id

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          q.resolve()
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }
  }
})(angular);
