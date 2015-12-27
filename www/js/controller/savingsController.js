// Controller de l'onglet Savings
angular.module('savings.controller', ['savings.service']
).controller('SavingsCtrl', function(Savings) {
  'use strict';

  var vm = this;
  vm.removeSaving = removeSaving;

  // Chargement données
  Savings.getSavings().then(function(_savings) {
    vm.savings = _savings;
  });

  // Fonctions privées
  function removeSaving($index, saving) {
    Savings.removeSaving(saving).then(function() {

      vm.savings.splice($index, 1);
    });
  }

});
