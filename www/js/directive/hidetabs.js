angular.module('directives').directive('hideTabs', function($rootScope) {
  'use strict';

  return {
    restrict: 'A',
    link: function(scope, element, attributes) {
      scope.$watch(attributes.hideTabs, function(value) {
        $rootScope.hideTabs = value;
      });
    }
  };
});
