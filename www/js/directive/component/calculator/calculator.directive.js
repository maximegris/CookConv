(function (angular, undefined) {
  'use strict'
  angular.module('directives').directive('calculator', calculator)

  calculator.$inject = []

  /* @ngInject */
  function calculator() {
    var directive = {
      restrict: 'E',
      templateUrl: 'tab-calculator.html',
      controller: CalculatorController,
      controllerAs: 'calcvm',
      bindToController: true // because the scope is isolated
    }

    return directive
  }

  CalculatorController.$inject = ['$scope', '$rootScope', '$cordovaSplashscreen', '$ionicPlatform', '$ionicPopup', 'CalculatorFactory', 'SavingsFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_']

  /* @ngInject */
  function CalculatorController($scope, $rootScope, $cordovaSplashscreen, $ionicPlatform, $ionicPopup, CalculatorFactory, SavingsFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
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
        vm.ingredients = CalculatorFactory.getIngredients()
        vm.types = CalculatorFactory.getTypes()
        vm.converter = CalculatorFactory.getConverter()

        if (window.cordova) {
          $cordovaSplashscreen.hide()
        }
      })
    }

    function calculateConversion() {
      if (vm.converter) {
        var _from_val = vm.converter.from
        var _from = vm.converter.from_type
        var _to = vm.converter.to_type
        var _ingredient = vm.converter.ingredient

        if (_from_val === '0') {
          vm.converter.to = '0'
        } else {
          if (_from.type === _to.type) {
            vm.converter.to = (Math.floor(1000 * (_from_val * _to.rapport / _from.rapport)) / 1000).toString()
          } else if (_from.type === 'poids') {
            vm.converter.to = (Math.floor(1000 * (_from_val * _to.rapport / (_from.rapport * _ingredient.masse_volumique))) / 1000).toString()
          } else {
            vm.converter.to = (Math.floor(1000 * (_from_val * _to.rapport * _ingredient.masse_volumique / _from.rapport)) / 1000).toString()
          }
        }

        // Persist current state to keep value after tab changed
        CalculatorFactory.setConverter(vm.converter)
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
      var tmp_type = vm.converter.from_type

      vm.converter.from_type = vm.converter.to_type
      vm.converter.to_type = tmp_type

      vm.converter.from = vm.converter.to.toString()

      calculateConversion()
    }

    function modalFromType() {
      var confirmPopup = $ionicPopup.show({
        templateUrl: 'modal/popup-from.html',
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
        templateUrl: 'modal/popup-to.html',
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
        templateUrl: 'modal/popup-ingredient.html',
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

        SavingsFactory.addSaving(_item).then(function () {
          $rootScope.$broadcast(_LOADING_SPINNER_END_)
        })
      }
    }
  }
})(angular);
