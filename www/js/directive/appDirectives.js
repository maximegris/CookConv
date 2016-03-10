angular.module('app.directives', []).directive('hideTabs', function($rootScope) {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$watch(attributes.hideTabs, function(value) {
        $rootScope.hideTabs = value;
      });

      /*scope.$on('$destroy', function() {
        $rootScope.hideTabs = false;
      });*/
    }
  };
}).directive('appVersion', function() {
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