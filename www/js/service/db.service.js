(function (angular, undefined) {
  'use strict'

  angular.module('services').factory('DBFactory', DBFactory)

  DBFactory.$inject = ['$ionicPlatform', '$q', '$log', '$cordovaSQLite', 'IngredientsFactory', 'TypesFactory', 'LanguagesFactory', 'SettingsFactory']

  /* @ngInject */
  function DBFactory($ionicPlatform, $q, $log, $cordovaSQLite, IngredientsFactory, TypesFactory, LanguagesFactory, SettingsFactory) {
    return {
      getContextApplication: getContextApplication
    }

    function getContextApplication(init, lang) {
      var q = $q.defer()

      if (init) {
        // Init table settings with language info
        LanguagesFactory.updateCurrentLanguage(lang)
          .then(function () {
            return $q.all([SettingsFactory.getSettings(), IngredientsFactory.getIngredients(lang), TypesFactory.getTypes(lang)])
          }, function (err) {
            q.reject(err)
          })
          .then(function (result) {
            q.resolve(result)
          }, function (err) {
            q.reject(err)
          })
      } else {
        LanguagesFactory.getCurrentLanguage()
          .then(function (_current) {
            return $q.all([SettingsFactory.getSettings(), IngredientsFactory.getIngredients(_current.current_lang), TypesFactory.getTypes(_current.current_lang)])
          }, function (err) {
            q.reject(err)
          })
          .then(function (result) {
            q.resolve(result)
          }, function (err) {
            q.reject(err)
          })
      }

      return q.promise
    }
  }
})(angular);
