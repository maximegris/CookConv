(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('settings', settings)

  settings.$inject = []

  /* @ngInject */
  function settings() {
    var directive = {
      restrict: 'E',
      templateUrl: 'tab-settings.html',
      controller: SettingsController,
      controllerAs: 'settingsvm',
      bindToController: true // because the scope is isolated
    }

    return directive
  }

  SettingsController.$inject = ['$scope', '$rootScope', '$translate', '$ionicPopup', 'SettingsFactory', 'IngredientsFactory', 'SavingsFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_']

  /* @ngInject */
  function SettingsController($scope, $rootScope, $translate, $ionicPopup, SettingsFactory, IngredientsFactory, SavingsFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
    var vm = this
    vm.modalConfirmReset = modalConfirmReset

    activate()

    function activate() {
      vm.settings = SettingsFactory.getLocalSettings()
    }

    function modalConfirmReset() {
      var confirmPopup = $ionicPopup.show({
        template: '{{ \'REINIT_APP_CONFIRMATION\' | translate }}',
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: $translate.instant('CANCEL'),
          type: 'button-dark',
          onTap: function (e) {
            $scope.reset = false
          }
        }, {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function (e) {
            $scope.reset = true
          }
        }]
      })
      confirmPopup.then(resetApplication)
    }

    function resetApplication() {
      if ($scope.reset) {
        $rootScope.$broadcast(_LOADING_SPINNER_START_)

        IngredientsFactory.resetIngredients().then(function () {
          SavingsFactory.resetSavings().then(function () {
            $rootScope.$broadcast(_LOADING_SPINNER_END_)
            modalReinitDone()
          })
        })
      }
    }

    function modalReinitDone() {
      var confirmPopup = $ionicPopup.show({
        template: '{{ \'REINIT_APP_DONE\' | translate }}',
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: '<b>OK</b>',
          type: 'button-positive'
        }]
      })
      confirmPopup.then(function () {

      })
    }
  }
})(angular);
