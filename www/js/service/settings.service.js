(function (angular, undefined) {
  'use strict'

  angular.module('services').factory('SettingsFactory', SettingsFactory)

  SettingsFactory.$inject = ['$q', '$log', '$cordovaSQLite']

  /* @ngInject */
  function SettingsFactory($q, $log, $cordovaSQLite) {
    var _settings = {}

    return ({
      getSettings: getSettings,
      getLocalSettings: getLocalSettings,
      setLocalSettings: setLocalSettings
    })

    function getLocalSettings() {
      return _settings
    }

    function setLocalSettings(settings) {
      _settings = settings
    }

    function getSettings() {
      $log.debug('Récupération settings')
      var q = $q.defer()

      var dbQuery = 'SELECT current_lang, current_lang_label, db_version FROM settings'

      $q.when($cordovaSQLite.execute(window._db, dbQuery))
        .then(function (res) {
          q.resolve({
            current_lang: res.rows.item(0).current_lang,
            current_lang_label: res.rows.item(0).current_lang_label,
            db_version: res.rows.item(0).db_version
          })
        }, function (error) {
          q.reject(error)
        })

      return q.promise
    }
  }
})(angular);
