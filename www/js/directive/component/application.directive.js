(function(angular) {
  'use strict';
  angular.module('directives').directive('application', application);

  application.$inject = [];

  function application() {

    var directive = {
      restrict: 'E',
      templateUrl: 'app.html',
      controller: applicationController,
      controllerAs: 'appvm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * IoC
   */
  applicationController.$inject = [];

  function applicationController() {



  }
})(angular);
