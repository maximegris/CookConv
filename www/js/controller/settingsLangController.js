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

      $translate.use($scope.current.lang);

      DBFactory.getContextApplication(true)
      .then(function(success) {
        $rootScope.settings = success[0];
        $rootScope.ingredients = success[1];
        $rootScope.types  = success[2];
        $rootScope.hide();
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
