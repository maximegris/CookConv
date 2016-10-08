(function (angular, undefined) {
  'use strict'

  angular.module('services').factory('LanguagesFactory', LanguagesFactory)

  LanguagesFactory.$inject = ['$q', '$log', '$cordovaSQLite']

  /* @ngInject */
  function LanguagesFactory($q, $log, $cordovaSQLite) {
    return {
      getLanguages: getLanguages,
      updateCurrentLanguage: updateCurrentLanguage,
      getCurrentLanguage: getCurrentLanguage
    }

    function getLanguages() {
      var q = $q.defer()

      var _languages = []

      var dbQuery = 'SELECT code, label FROM languages ORDER BY label'

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          if (res.rows.length > 0) {
            for (var i = 0; i < res.rows.length; i++) {
              _languages.push({
                code: res.rows.item(i).code,
                label: res.rows.item(i).label
              })
            }
          }
          q.resolve(_languages)
        }, function (err) {
          q.reject(err)
        })

      return q.promise
    }

    function updateCurrentLanguage(language) {
      var q = $q.defer()

      var dbQuery = 'UPDATE settings SET current_lang = ?, current_lang_label = (SELECT label FROM languages WHERE code = ?)'

      $cordovaSQLite.execute(window._db, dbQuery, [language, language])
        .then(function () {
          q.resolve()
        }, function (error) {
          q.reject(error)
        })

      return q.promise
    }

    function getCurrentLanguage() {
      var q = $q.defer()

      var _current = {
        current_lang: 'fr'
      }

      var dbQuery = 'SELECT current_lang FROM settings'

      $cordovaSQLite.execute(window._db, dbQuery)
        .then(function (res) {
          if (res.rows.length > 0) {
            _current.current_lang = res.rows.item(0).current_lang
          }
          q.resolve(_current)
        },
        function (err) {
          q.reject(err)
        })

      return q.promise
    }
  }
})(angular);
