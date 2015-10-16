// Contrller de l'onglet settings
angular.module('settings.lang.controller', ['languages.service'])
.controller('SettingsLangCtrl',  function($scope, Languages) {

  Languages.getLanguages().then(function(_languages) {
      $scope.current = _languages[0];
      $scope.languages = _languages;
  });

});
