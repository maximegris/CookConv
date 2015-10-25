// Controller de l'onglet Savings
angular.module('savings.controller', ['savings.service']
).controller('SavingsCtrl', function($scope, $translate, $ionicConfig, Savings) {

  Savings.getSavings().then(function(_savings) {

    $scope.savings = _savings;

  });

  $scope.removeSaving = function($index, saving) {
    Savings.removeSaving(saving).then(function() {

      $scope.savings.splice($index, 1);

    });
  };

});
