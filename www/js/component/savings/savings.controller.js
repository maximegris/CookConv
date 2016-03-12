// Controller de l'onglet Savings
(function(angular, undefined) {
  'use strict';

  angular.module('controllers').controller('SavingsController', SavingsController);

  SavingsController.$inject = ['SavingsFactory'];

  function SavingsController(SavingsFactory) {

    var vm = this;
    vm.removeSaving = removeSaving;

    // Chargement données
    SavingsFactory.getSavings().then(function(_savings) {
      vm.savings = _savings;
    });

    // Fonctions privées
    function removeSaving($index, saving) {
      SavingsFactory.removeSaving(saving).then(function() {

        vm.savings.splice($index, 1);
      });
    }

  }
})(angular);
