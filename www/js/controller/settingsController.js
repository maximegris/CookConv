// Contrller de l'onglet settings
angular.module('settings.controller', [])
.controller('SettingsCtrl',  function($scope, $rootScope) {
  'use strict';

  // scope
  $scope.settings = {
    lang: $rootScope.settings.current_lang_label,
  };

});
