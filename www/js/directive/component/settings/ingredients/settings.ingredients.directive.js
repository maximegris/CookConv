(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('settingsIngredients', settingsIngredients)

  settingsIngredients.$inject = []

  /* @ngInject */
  function settingsIngredients() {
    var directive = {
      restrict: 'E',
      templateUrl: 'directive/component/settings/ingredients/settings-ingredients.html',
      controller: SettingsIngredientsController,
      controllerAs: 'ingredientsvm',
      bindToController: true // because the scope is isolated
    }

    return directive
  }

  SettingsIngredientsController.$inject = ['$scope', '$rootScope', '$ionicPopup', '$translate', 'IngredientsFactory', 'CalculatorFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_']

  /* @ngInject */
  function SettingsIngredientsController($scope, $rootScope, $ionicPopup, $translate, IngredientsFactory, CalculatorFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
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
      IngredientsFactory.getIngredientsByRef(0).then(function (_ingredients) {
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
        templateUrl: 'directive/component/settings/ingredients/modal/popup-ingredient.html',
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: $translate.instant('CANCEL'),
          type: 'button-dark',
          onTap: function (e) {
            vm.edition.save = false
          }
        }, {
          text: '<b>OK</b>',
          type: 'button-positive',
          onTap: function (e) {
            if (vm.popupForm.$invalid) {
              e.preventDefault();
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
          IngredientsFactory.updateUserIngredient(vm.record).then(function () {
            refreshIngredients()
          })
        } else {
          IngredientsFactory.createUserIngredient(vm.record).then(function () {
            refreshIngredients()
          })
        }
      }
    }

    function refreshIngredients() {
      IngredientsFactory.getIngredients($translate.use()).then(function (_ingredients) {
        var _userIngredients = []
        _ingredients.map(function (_ingredient) {
          if (_ingredient.ref === 0) {
            _userIngredients.push(_ingredient)
          }
        })
        vm.ingredients = _userIngredients

        CalculatorFactory.setIngredients(_ingredients)

        $rootScope.$broadcast(_LOADING_SPINNER_END_)
      })
    }

    function removeIngredient($index, ingredient) {
      IngredientsFactory.removeUserIngredient(ingredient).then(function () {
        vm.ingredients.splice($index, 1)
      })
    }
  }
})(angular);
