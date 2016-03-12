// Controller de l'onglet settings ingredients
(function(angular) {

'use strict';

	angular.module('controllers').controller('SettingsIngredientsController', SettingsIngredientsController);

SettingsIngredientsController.$inject = ['Ingredients'];

	function SettingsIngredientsController(Ingredients) {

		var vm = this;

		Ingredients.getIngredientsByRef("1").then(function(_ingredients) {
			vm.ingredients = _ingredients;
		});

	}

})(angular);
