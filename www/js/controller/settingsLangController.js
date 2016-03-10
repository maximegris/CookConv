// Controller de l'onglet settings langues
angular.module('settings.lang.controller', ['languages.service', 'db.service']).controller('SettingsLangCtrl', function($controller, $scope, $rootScope, $translate, Languages, DBFactory) {
  'use strict';

  var vm = this;

  // IoC
  $controller('LoadCtrl');

  // Chargement des données
  vm.current = {
    lang: $translate.use()
  };

  Languages.getLanguages().then(function(_languages) {

    vm.languages = _languages;

    $scope.$watch('langvm.current.lang', changeLanguage, false);
  });

  // Fonctions privées
  function changeLanguage() {
    if (vm.current) {

      $rootScope.show();

      DBFactory.getContextApplication(true, vm.current.lang)
        .then(function(success) {

            if ($translate.use() !== vm.current.lang) {
              $rootScope.init = true;
              $translate.use(vm.current.lang);
              $rootScope.settings = success[0];
              $rootScope.ingredients = success[1];
              $rootScope.types = success[2];
            }

            // On laisse pendant 0.5 seconde la fenêtre pour montrer qu'il se passe quelquechose.
            setTimeout(function() {
              $rootScope.hide();
            }, 500);

          },
          function(error) {
            alert("Error update Language" + error);
            $rootScope.hide();
          });

    }
  }

});