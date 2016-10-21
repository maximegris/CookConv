import template from './settings-ingredients.html'
import popupIngredientTemplate from './modal/popup-ingredient.html'

class SettingsIngredients {
  constructor() {
    this.restrict = 'E'
    this.scope = {}
    this.template = template
    this.controller = SettingsIngredientsController
    this.controllerAs = 'ingredientsvm'
    this.bindToController = true
  }
}

class SettingsIngredientsController {
  /* @ngInject */
  constructor($scope, $rootScope, $ionicPopup, $translate, IngredientsService, CalculatorService, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
    var vm = this
    vm.createIngredient = createIngredient
    vm.editIngredient = editIngredient
    vm.removeIngredient = removeIngredient

    activate()

    function activate() {
      vm.record = {}
      vm.edition = {
        save: false,
        index: -1
      }
      IngredientsService.getIngredientsByRef(0).then((_ingredients) => {
        vm.ingredients = _ingredients
      })
    }

    function createIngredient() {
      vm.edition = {
        save: false,
        index: -1
      }
      vm.record = {}
      modalEditionIngredient()
    }

    function editIngredient($index, ingredient) {
      vm.edition = {
        save: false,
        index: $index
      }
      vm.record = ingredient
      modalEditionIngredient()
    }

    function modalEditionIngredient() {
      var creationPopup = $ionicPopup.confirm({
        template: popupIngredientTemplate,
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: $translate.instant('CANCEL'),
          type: 'button-dark',
          onTap: (e) => {
            vm.edition.save = false
          }
        }, {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: (e) => {
            if (vm.popupForm.$invalid) {
              e.preventDefault()
            } else {
              vm.edition.save = true
            }
          }
        }]
      })
      creationPopup.then(actionEditionIngredient)
    }

    function actionEditionIngredient() {
      if (vm.edition.save) {
        $rootScope.$broadcast(_LOADING_SPINNER_START_)
        if (vm.record.id) {
          IngredientsService.updateUserIngredient(vm.record).then(() => {
            refreshIngredients()
          })
        } else {
          IngredientsService.createUserIngredient(vm.record).then(() => {
            refreshIngredients()
          })
        }
      }
    }

    function refreshIngredients() {
      IngredientsService.getIngredients($translate.use()).then((_ingredients) => {
        var _userIngredients = []
        _ingredients.map((_ingredient) => {
          if (_ingredient.ref === 0) {
            _userIngredients.push(_ingredient)
          }
        })
        vm.ingredients = _userIngredients

        CalculatorService.setIngredients(_ingredients)

        $rootScope.$broadcast(_LOADING_SPINNER_END_)
      })
    }

    function removeIngredient($index, ingredient) {
      IngredientsService.removeUserIngredient(ingredient).then(() => {
        vm.ingredients.splice($index, 1)
      })
    }
  }
}

export default {
  selector: 'settingsIngredients',
  directive: SettingsIngredients
}



