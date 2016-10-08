(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('settingsIngredients', settingsIngredients)

  settingsIngredients.$inject = []

  /* @ngInject */
  function settingsIngredients() {
    var directive = {
      restrict: 'E',
      templateUrl: 'settings/settings-ingredients.html',
      controller: SettingsIngredientsController,
      controllerAs: 'ingredientsvm',
      bindToController: true // because the scope is isolated
    }

    return directive
  }

  SettingsIngredientsController.$inject = ['IngredientsFactory']

  /* @ngInject */
  function SettingsIngredientsController(IngredientsFactory) {
    var vm = this

    activate()

    function activate() {
      IngredientsFactory.getIngredientsByRef('1').then(function (_ingredients) {
        vm.ingredients = _ingredients
      })
    }
  }
})(angular);
