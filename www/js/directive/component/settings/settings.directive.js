(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('settings', settings)

  settings.$inject = []

  /* @ngInject */
  function settings() {
    var directive = {
      restrict: 'E',
      templateUrl: 'directive/component/settings/tab-settings.html',
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
      vm.reset = false
    }

    function modalConfirmReset() {
      vm.reset = false
      var confirmPopup = $ionicPopup.show({
        template: '<span translate="REINIT_APP_CONFIRMATION"></span>',
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: $translate.instant('CANCEL'),
          type: 'button-dark',
          onTap: function (e) {
            vm.reset = false
          }
        }, {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function (e) {
            vm.reset = true
          }
        }]
      })
      confirmPopup.then(resetApplication)
    }

    function resetApplication() {
      console.log(vm.reset)
      if (vm.reset) {
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
        template: '<span translate="REINIT_APP_DONE"></span>',
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
