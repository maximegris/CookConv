(function(angular, undefined) {

  'use strict';


  angular.module('directives').directive('appVersion', appVersion);

  appVersion.$inject = [];

  function appVersion() {

    return function(scope, elm) {
      if (window.cordova) {
        cordova.getAppVersion(function(version) {
          elm.text(version);
        });
      } else {
        elm.text("browser.version-1.0.0");
      }
    };
  }

})(angular);
