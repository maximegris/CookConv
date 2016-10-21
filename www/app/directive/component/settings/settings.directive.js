import template from './tab-settings.html'

class Settings {
  constructor() {
    this.restrict = 'E'
    this.scope = {}
    this.template = template
    this.controller = SettingsController
    this.controllerAs = 'settingsvm'
    this.bindToController = true
  }
}

class SettingsController {
  /* @ngInject */
  constructor($scope, $rootScope, $translate, $ionicPopup, SettingsService, IngredientsService, SavingsService, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
    var vm = this
    vm.modalConfirmReset = modalConfirmReset

    activate()

    function activate() {
      vm.settings = SettingsService.getLocalSettings()
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
          onTap: (e) => {
            vm.reset = false
          }
        }, {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: (e) => {
            vm.reset = true
          }
        }]
      })
      confirmPopup.then(resetApplication)
    }

    function resetApplication() {
      if (vm.reset) {
        $rootScope.$broadcast(_LOADING_SPINNER_START_)

        IngredientsService.resetIngredients().then(() => {
          SavingsService.resetSavings().then(() => {
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
      confirmPopup.then(() => {

      })
    }
  }
}

export default {
  selector: 'settings',
  directive: Settings
}
