(function(angular, undefined) {
  'use strict';
  angular.module('directives').directive('settingsIngredients', settingsIngredients);

  settingsIngredients.$inject = [];

  /* @ngInject */
  function settingsIngredients() {

    var directive = {
      restrict: 'E',
      templateUrl: 'settings/settings-ingredients.html',
      controller: SettingsIngredientsController,
      controllerAs: 'ingredientsvm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * Injection de dépendances.
   */
  SettingsIngredientsController.$inject = ['Ingredients'];

  /* @ngInject */
  function SettingsIngredientsController(Ingredients) {

    var vm = this;

    Ingredients.getIngredientsByRef("1").then(function(_ingredients) {
      vm.ingredients = _ingredients;
    });

  }
})(angular);
