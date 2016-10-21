import template from './settings-lang.html'

class SettingsLang {
  constructor() {
    this.restrict = 'E'
    this.scope = {}
    this.template = template
    this.controller = SettingsLangController
    this.controllerAs = 'langvm'
    this.bindToController = true
  }
}

class SettingsLangController {
  /* @ngInject */
  constructor($scope, $rootScope, $translate, LanguagesService, SettingsService, CalculatorService, DBService, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
    var vm = this

    activate()

    function activate() {
      vm.current = {
        lang: $translate.use()
      }

      LanguagesService.getLanguages().then((_languages) => {
        vm.languages = _languages
        $scope.$watch('langvm.current.lang', changeLanguage, false)
      })
    }

    function changeLanguage() {
      if (vm.current) {
        $rootScope.$broadcast(_LOADING_SPINNER_START_)

        DBService.getContextApplication(true, vm.current.lang)
          .then((success) => {
            if ($translate.use() !== vm.current.lang) {
              $translate.use(vm.current.lang)
              SettingsService.setLocalSettings(success[0])
              CalculatorService.init(success[1], success[2])
            }

            $rootScope.$broadcast(_LOADING_SPINNER_END_)
          })
      }
    }
  }
}

export default {
  selector: 'settingsLang',
  directive: SettingsLang
}
