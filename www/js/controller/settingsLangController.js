// Contrller de l'onglet settings
angular.module('settings.lang.controller', ['languages.service', 'db.service'])
.controller('SettingsLangCtrl',  function($controller, $scope, $rootScope, $translate, $ionicConfig , Languages, DBFactory) {
  'use strict';

  // IoC
  $controller('LoadCtrl');

  // Methodes privees
  function changeLanguage() {
    if($scope.current) {

      $rootScope.show();

      DBFactory.getContextApplication(true, $scope.current.lang)
      .then(function(success) {
        $translate.use($scope.current.lang);
        $rootScope.settings = success[0];
        $rootScope.ingredients = success[1];
        $rootScope.types  = success[2];

        // On laisse pendant 1 seconde la fenêtre pour montrer qu'il se passe quelquechose.
        setTimeout(function() {
          $rootScope.hide();
        }, 1000);

      },
      function(error){
        alert("Error update Language" + error);
        $rootScope.hide();
      });

    }
  }

  // scope
  Languages.getLanguages().then(function(_languages) {
    $scope.current = {
      lang : $translate.use()
    };
    $scope.languages = _languages;

    $scope.$watch('current.lang', changeLanguage, false);
  });



});
