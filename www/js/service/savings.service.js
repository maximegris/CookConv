(function (angular, undefined) {
  'use strict'

  angular.module('services').factory('SavingsFactory', SavingsFactory)

  SavingsFactory.$inject = ['$q', '$log', '$cordovaSQLite', '$translate']

  /* @ngInject */
  function SavingsFactory($q, $log, $cordovaSQLite, $translate) {
    return {
      getSavings: getSavings,
      addSaving: addSaving,
      removeSaving: removeSaving,
      resetSavings: resetSavings
    }

    function getSavings() {
      var q = $q.defer()

      var _savings = []

      var dbQuery = 'SELECT s.id, i.name_' + $translate.use() + ', s.from_value, s.from_type, s.to_value, s.to_type FROM savings s INNER JOIN ingredients i ON i.id = s.ingredient ORDER BY s.id'

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              _savings.push({
                id: res.rows.item(i).id,
                fromVal: res.rows.item(i).from_value,
                fromType: res.rows.item(i).from_type,
                toVal: res.rows.item(i).to_value,
                toType: res.rows.item(i).to_type,
                ingredient: res.rows.item(i)['name_' + $translate.use()]
              })
            }
          }
          q.resolve(_savings)
        },
        function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function addSaving(_saving) {
      var q = $q.defer()

      var dbQuery = 'INSERT INTO savings(ingredient, from_value, from_type, to_value, to_type) VALUES (?,?,?,?,?)'

      $cordovaSQLite.execute(window._db, dbQuery, [_saving.ingredient, _saving.fromVal, _saving.fromType, _saving.toVal, _saving.toType])
        .then(function () {
          q.resolve()
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function removeSaving(_saving) {
      var q = $q.defer()

      var dbQuery = 'DELETE FROM savings WHERE id = ?'

      $cordovaSQLite.execute(window._db, dbQuery, [_saving.id])
        .then(function () {
          q.resolve()
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function resetSavings() {
      var q = $q.defer()

      var dbQuery = 'DELETE FROM savings'

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function () {
          q.resolve()
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }
  }
})(angular);
