(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('hideTabs', hideTabs)

  hideTabs.$inject = ['$rootScope']

  /* @ngInject */
  function hideTabs($rootScope) {
    var directive = {
      restrict: 'A',
      link: linkFn
    }

    return directive

    function linkFn(scope, element, attributes) {
      scope.$watch(attributes.hideTabs, function (value) {
        $rootScope.hideTabs = value
      })
    }
  }
})(angular)
