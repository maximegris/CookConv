// Contrller de l'onglet settings
angular.module('settings.controller', [])
.controller('SettingsCtrl',  function($rootScope) {
  'use strict';

  var vm = this;

  vm.settings = {
    lang: $rootScope.settings.current_lang_label
  };

});
