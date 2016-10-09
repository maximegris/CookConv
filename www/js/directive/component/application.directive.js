(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('application', application)

  application.$inject = []

  /* @ngInject */
  function application() {
    var directive = {
      restrict: 'E',
      templateUrl: 'directive/component/app.html',
      controller: ApplicationController,
      controllerAs: 'appvm',
      bindToController: true // because the scope is isolated
    }

    return directive
  }

  ApplicationController.$inject = []

  /* @ngInject */
  function ApplicationController() {

  }
})(angular);
