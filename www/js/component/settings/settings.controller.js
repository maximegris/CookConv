// Controller de l'onglet settings
(function(angular, undefined) {
  'use strict';

  angular.module('controllers').controller('SettingsController', SettingsController);

  SettingsController.$inject = ['$rootScope', 'IngredientsFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_'];

  function SettingsController($rootScope, IngredientsFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {

    var vm = this;
    vm.versionPro = versionPro;

    vm.settings = {
      lang: $rootScope.settings.current_lang_label
    };

    //TODO Désactiver les boutons de la version PRO par défaut

    // Méthodes privées
    function versionPro(action) {
      if ($rootScope.pro) {
        switch (action) {
          case "INGREDIENTS":
            openViewManageIngredients();
            break;
          case "RESET":
            resetApplication();
            break;
          default:
            break;
        }
      }
    }

    function openViewManageIngredients() {
      window.location.href = "#/tab/settings/ingredients";
    }

    function resetApplication() {
      $rootScope.$broadcast(_LOADING_SPINNER_START_);

      IngredientsFactory.resetIngredients().then(function() {
        $rootScope.$broadcast(_LOADING_SPINNER_END_);
      });
    }

  }

})(angular);
