// Controller de l'onglet settings
angular.module('settings.controller', ['ingredients.service']).controller('SettingsCtrl', function($controller, $rootScope, Ingredients) {
	'use strict';

	var vm = this;
	vm.versionPro = versionPro;

	// IoC
	$controller('LoadCtrl');

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
		$rootScope.show();

		Ingredients.resetIngredients().then(function() {

			// On laisse pendant 0.5 seconde la fenêtre pour montrer qu'il se passe quelquechose.
			setTimeout(function() {
				$rootScope.hide();

				// TODO Toast pour prévenir que le traitement a réussi
			}, 500);
		});
	}

});