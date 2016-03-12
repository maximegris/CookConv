(function(angular, undefined) {
  'use strict';
  angular.module('directives').directive('settings', settings);

  settings.$inject = [];

  function settings() {

    var directive = {
      restrict: 'E',
      templateUrl: 'tab-settings.html',
      controller: settingsController,
      controllerAs: 'settingsvm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * Injection de dépendances.
   */
  settingsController.$inject = ['$rootScope', 'IngredientsFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_'];

  function settingsController($rootScope, IngredientsFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {

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
