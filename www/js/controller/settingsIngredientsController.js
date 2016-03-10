// Controller de l'onglet settings ingredients
angular.module('settings.ingredients.controller', ['ingredients.service']).controller('SettingsIngredientsCtrl', function($controller, $scope, $rootScope, $translate, Ingredients) {
	'use strict';

	var vm = this;

	// IoC
	$controller('LoadCtrl');

	Ingredients.getIngredientsByRef("1").then(function(_ingredients) {
		vm.ingredients = _ingredients;
	});

});