(function(angular) {
  'use strict';
  angular.module('directives').directive('application', application);

  application.$inject = [];

  function application() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app.html',
      controller: ApplicationController,
      controllerAs: 'appvm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * IoC
   */
  ApplicationController.$inject = [];

  function ApplicationController() {

  }
})(angular);
