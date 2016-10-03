// Définition du service de DB
(function (angular, undefined) {
  'use strict'

  angular.module('services').factory('DBFactory', DBFactory)

  DBFactory.$inject = ['$ionicPlatform', '$q', '$log', '$cordovaSQLite', 'IngredientsFactory', 'TypesFactory', 'LanguagesFactory', 'SettingsFactory']

  /* @ngInject */
  function DBFactory($ionicPlatform, $q, $log, $cordovaSQLite, IngredientsFactory, TypesFactory, LanguagesFactory, SettingsFactory) {
    // Methodes privees
    var getContextApplication = function (init, lang) {
      var q = $q.defer()

      if (init) {
        // On initialise la table settings avec la base langue
        LanguagesFactory.updateCurrentLanguage(lang)
          .then(function () {
            return $q.all([SettingsFactory.getSettings(), IngredientsFactory.getIngredients(lang), TypesFactory.getTypes(lang)])
          }, function () {
            window.alert('Error init language')
          })
          .then(function (result) {
            q.resolve(result)
          }, function () {
            window.alert('Error init context')
          })
      } else {
        LanguagesFactory.getCurrentLanguage()
          .then(function (_current) {
            return $q.all([SettingsFactory.getSettings(), IngredientsFactory.getIngredients(_current.current_lang), TypesFactory.getTypes(_current.current_lang)])
          }, function () {
            window.alert('Error init language')
          })
          .then(function (result) {
            q.resolve(result)
          }, function () {
            window.alert('Error init context')
          })
      }

      return q.promise
    }

    // Public interface
    return {
      getContextApplication: getContextApplication
    }
  }
})(angular);
