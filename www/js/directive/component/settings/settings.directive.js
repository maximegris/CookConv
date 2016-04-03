(function(angular, undefined) {
  'use strict';
  angular.module('directives').directive('settings', settings);

  settings.$inject = [];

  /* @ngInject */
  function settings() {

    var directive = {
      restrict: 'E',
      templateUrl: 'tab-settings.html',
      controller: SettingsController,
      controllerAs: 'settingsvm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * Injection de dépendances.
   */
  SettingsController.$inject = ['$rootScope', 'SettingsFactory', 'IngredientsFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_'];

  /* @ngInject */
  function SettingsController($rootScope, SettingsFactory, IngredientsFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {

    var vm = this;
    var pro = false;

    activate();

    // Méthodes privées
    function activate() {
      vm.settings = SettingsFactory.getLocalSettings();
    }

    //TODO Désactiver les boutons de la version PRO par défaut
    function versionPro(action) {
      if (pro) {
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
