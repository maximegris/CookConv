import template from './tab-calculator.html'
import popupFromTemplate from './modal/popup-from.html'
import popupIngredientTemplate from './modal/popup-ingredient.html'
import popupToTemplate from './modal/popup-to.html'

class Calculator {
  constructor() {
    this.restrict = 'E'
    this.scope = {}
    this.template = template
    this.controller = CalculatorController
    this.controllerAs = 'calcvm'
    this.bindToController = true
  }
}

class CalculatorController {
  /* @ngInject */
  constructor($scope, $rootScope, $cordovaSplashscreen, $ionicPlatform, $ionicPopup, CalculatorService, SavingsService, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
    var vm = this

    vm.addValCalc = addValCalc
    vm.inverseVal = inverseVal
    vm.removeValCalc = removeValCalc
    vm.saveConverter = saveConverter
    vm.modalFromType = modalFromType
    vm.modalIngredient = modalIngredient
    vm.modalToType = modalToType
    vm.calculateConversion = calculateConversion

    activate()

    function activate() {
      $ionicPlatform.ready(function () {
        vm.ingredients = CalculatorService.getIngredients()
        vm.types = CalculatorService.getTypes()
        vm.converter = CalculatorService.getConverter()

        if (window.cordova) {
          $cordovaSplashscreen.hide()
        }
      })
    }

    function calculateConversion() {
      if (vm.converter) {
        var _fromVal = vm.converter.from
        var _from = vm.converter.from_type
        var _to = vm.converter.to_type
        var _ingredient = vm.converter.ingredient

        if (_fromVal === '0') {
          vm.converter.to = '0'
        } else {
          if (_from.type === _to.type) {
            vm.converter.to = (Math.floor(1000 * (_fromVal * _to.rapport / _from.rapport)) / 1000).toString()
          } else if (_from.type === 'poids') {
            vm.converter.to = (Math.floor(1000 * (_fromVal * _to.rapport / (_from.rapport * _ingredient.masse_volumique))) / 1000).toString()
          } else {
            vm.converter.to = (Math.floor(1000 * (_fromVal * _to.rapport * _ingredient.masse_volumique / _from.rapport)) / 1000).toString()
          }
        }

        // Persist current state to keep value after tab changed
        CalculatorService.setConverter(vm.converter)
      }
    }

    function addValCalc(value) {
      var lengthVal = vm.converter.from.length

      if (lengthVal <= 5) {
        if (vm.converter.from === '0' && value !== '0') {
          if (value === '.') {
            vm.converter.from = '0.'
          } else {
            vm.converter.from = value
          }
        } else if (vm.converter.from !== '0') {
          if (value !== '.' || (value === '.' && lengthVal !== 5 && vm.converter.from.indexOf('.') === -1)) {
            vm.converter.from += value
          }
        }
      }

      calculateConversion()
    }

    function removeValCalc(all) {
      if (all) {
        vm.converter.from = '0'
        vm.converter.to = '0'
      } else {
        if (vm.converter.from.length > 1) {
          vm.converter.from = vm.converter.from.substring(0, vm.converter.from.length - 1)
        } else {
          vm.converter.from = '0'
        }

        calculateConversion()
      }
    }

    function inverseVal() {
      var _tmpType = vm.converter.from_type

      vm.converter.from_type = vm.converter.to_type
      vm.converter.to_type = _tmpType

      vm.converter.from = vm.converter.to.toString()

      calculateConversion()
    }

    function modalFromType() {
      var confirmPopup = $ionicPopup.show({
        template: popupFromTemplate,
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

    function modalToType() {
      var confirmPopup = $ionicPopup.show({
        template: popupToTemplate,
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

    function modalIngredient() {
      var confirmPopup = $ionicPopup.show({
        template: popupIngredientTemplate,
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

    function saveConverter() {
      if (vm.converter.from !== '0') {
        $rootScope.$broadcast(_LOADING_SPINNER_START_)

        var _item = {
          fromVal: vm.converter.from,
          fromType: vm.converter.from_type.code,
          toVal: vm.converter.to,
          toType: vm.converter.to_type.code,
          ingredient: vm.converter.ingredient.id
        }

        SavingsService.addSaving(_item).then(function () {
          $rootScope.$broadcast(_LOADING_SPINNER_END_)
        })
      }
    }
  }
}

export default {
  selector: 'calculator',
  directive: Calculator
}
