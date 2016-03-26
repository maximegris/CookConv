(function() {
  'use strict';

  angular.module('services').factory('SettingsFactory', SettingsFactory);

  SettingsFactory.$inject = [];

  /* @ngInject */
  function SettingsFactory() {

    var _settings = {};

    return ({
      getSettings: getSettings,
      setSettings: setSettings
    });

    function getSettings() {
      return _settings;
    }

    function setSettings(settings) {
      _settings = settings;
    }
  }
})();
