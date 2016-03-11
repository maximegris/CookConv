angular.module('directives').directive('appVersion', function() {
  'use strict';

  return function(scope, elm) {
    if (window.cordova) {
      cordova.getAppVersion(function(version) {
        elm.text(version);
      });
    } else {
      elm.text("browser.version-1.0.0");
    }
  };
});
