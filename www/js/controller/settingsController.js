// Contrller de l'onglet settings
angular.module('settings.controller', [])
.controller('SettingsCtrl',  function($scope, $rootScope, $log) {
  'use strict';

  // scope
  $scope.settings = {
    lang: $rootScope.settings.current_lang_label,
    type: $rootScope.settings.current_unit_label
  };

});
