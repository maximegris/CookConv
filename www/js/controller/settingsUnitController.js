// Contrller de l'onglet settings
angular.module('settings.unit.controller', ['types.service', 'db.service'])
.controller('SettingsUnitCtrl',  function($controller, $scope, $rootScope, $translate, $ionicConfig , Types, DBFactory) {
  'use strict';

  // IoC
  $controller('LoadCtrl');

  // Methodes privees
  function changeUnitType() {
    if($scope.current) {

      $rootScope.show();

      Types.updateCurrentUnitType($scope.current.unit)
      .then(function(success) {
        return DBFactory.getContextApplication(true,  $translate.use());
      },
      function(error){
        alert("Error update unit" + error);
        $rootScope.hide();
      })
      .then(function(success) {

        $rootScope.init = true;
        $rootScope.settings = success[0];
        $rootScope.ingredients = success[1];
        $rootScope.types  = success[2];

        // On laisse pendant 1 seconde la fenêtre pour montrer qu'il se passe quelquechose.
        setTimeout(function() {
          $rootScope.hide();
        }, 500);
      },
      function(error){
        alert("Error update unit" + error);
        $rootScope.hide();
      });

    }
  }

  // scope
  Types.getUnitTypes($translate.use()).then(function(_units) {
    $scope.current = {
      unit : $rootScope.settings.current_unit
    };
    $scope.units = _units;

    $scope.$watch('current.unit', changeUnitType, false);
  });



});
