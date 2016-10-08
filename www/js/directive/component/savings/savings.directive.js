(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('savings', savings)

  savings.$inject = []

  /* @ngInject */
  function savings() {
    var directive = {
      restrict: 'E',
      templateUrl: 'tab-savings.html',
      controller: SavingsController,
      controllerAs: 'savingsvm',
      bindToController: true // because the scope is isolated
    }

    return directive
  }

  SavingsController.$inject = ['SavingsFactory']

  /* @ngInject */
  function SavingsController(SavingsFactory) {
    var vm = this
    vm.removeSaving = removeSaving

    activate()

    function activate() {
      SavingsFactory.getSavings().then(function (_savings) {
        vm.savings = _savings
      })
    }

    function removeSaving($index, saving) {
      SavingsFactory.removeSaving(saving).then(function () {
        vm.savings.splice($index, 1)
      })
    }
  }
})(angular);
