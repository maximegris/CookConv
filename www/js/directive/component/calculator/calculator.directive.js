(function(angular) {
  'use strict';
  angular.module('directives').directive('calculator', calculator);

  calculator.$inject = [];

  function calculator() {

    var directive = {
      restrict: 'E',
      templateUrl: 'tab-calculator.html',
      controller: calculatorController,
      controllerAs: 'calcvm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * Injection de dépendances.
   */
  calculatorController.$inject = ['$scope', '$rootScope', '$cordovaSplashscreen', '$ionicPopup', 'SavingsFactory', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_'];

  function calculatorController($scope, $rootScope, $cordovaSplashscreen, $ionicPopup, SavingsFactory, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {

    var vm = this;

    vm.addValCalc = addValCalc;
    vm.inverseVal = inverseVal;
    vm.removeValCalc = removeValCalc;
    vm.saveConverter = saveConverter;
    vm.showFromType = showFromType;
    vm.showIngredient = showIngredient;
    vm.showToType = showToType;

    // Fonction d'écoute sur la vue
    $scope.$watch('converter.from_type', calculateConversion, false);
    $scope.$watch('converter.to_type', calculateConversion, false);
    $scope.$watch('converter.ingredient', calculateConversion, false);

    // Initialisation des données
    if ($rootScope.init) {
      $rootScope.init = false;

      $rootScope.converter = {
        "from": "0",
        "from_type": $rootScope.types[0],
        "to": "0",
        "to_type": $rootScope.types[3],
        "ingredient": $rootScope.ingredients[0],

        getTypeFrom: function() {
          return $rootScope.converter.from_type.code;
        },
        getTypeTo: function() {
          return $rootScope.converter.to_type.code;
        },
      };
    }

    // Fonctions privées
    function calculateConversion() {
      if ($rootScope.converter) {
        var _from_val = $rootScope.converter.from;
        var _from = $rootScope.converter.from_type;
        var _to = $rootScope.converter.to_type;
        var _ingredient = $rootScope.converter.ingredient;

        if (_from_val === "0") {
          $rootScope.converter.to = "0";
        } else {

          // On compare les types des mesures pour savoir comment on effectue le calcul de conversion
          // Utilisation de Math.floor & facteur pour afficher correctement les valeurs (meme toutes petites soient elles)
          if (_from.type === _to.type) {
            $rootScope.converter.to = (Math.floor(1000 * (_from_val * _to.rapport / _from.rapport)) / 1000).toString();
          } else if (_from.type === "poids") {
            $rootScope.converter.to = (Math.floor(1000 * (_from_val * _to.rapport / (_from.rapport * _ingredient.masse_volumique))) / 1000).toString();
          } else {
            $rootScope.converter.to = (Math.floor(1000 * (_from_val * _to.rapport * _ingredient.masse_volumique / _from.rapport)) / 1000).toString();
          }
        }
      }
    }

    function addValCalc(value) {

      var lengthVal = $rootScope.converter.from.length;

      if (lengthVal <= 5) {
        if ($rootScope.converter.from === "0" && value !== "0") {

          if (value === ".") {
            $rootScope.converter.from = "0.";
          } else {
            $rootScope.converter.from = value;
          }

        } else if ($rootScope.converter.from !== "0") {

          if (value !== "." || (value === "." && lengthVal !== 5 && $rootScope.converter.from.indexOf(".") === -1)) {
            $rootScope.converter.from += value;
          }

        }
      }

      calculateConversion();
    }

    function removeValCalc(all) {
      if (all) {
        $rootScope.converter.from = "0";
        $rootScope.converter.to = "0";
      } else {
        if ($rootScope.converter.from.length > 1) {
          $rootScope.converter.from = $rootScope.converter.from.substring(0, $rootScope.converter.from.length - 1);
        } else {
          $rootScope.converter.from = "0";
        }

        calculateConversion();
      }

    }

    function inverseVal() {
      var tmp = $rootScope.converter.from,
        tmp_type = $rootScope.converter.from_type;

      $rootScope.converter.from_type = $rootScope.converter.to_type;
      $rootScope.converter.to_type = tmp_type;

      $rootScope.converter.from = $rootScope.converter.to.toString();
      $rootScope.converter.to = tmp.toString();

    }

    function showFromType() {
      var confirmPopup = $ionicPopup.show({
        templateUrl: 'modal/popup-from.html',
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: '<b>OK</b>',
          type: 'button-positive'
        }]
      });
      confirmPopup.then(function() {

      });
    }

    function showToType() {
      var confirmPopup = $ionicPopup.show({
        templateUrl: 'modal/popup-to.html',
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: '<b>OK</b>',
          type: 'button-positive'
        }]
      });
      confirmPopup.then(function() {

      });
    }

    function showIngredient() {
      var confirmPopup = $ionicPopup.show({
        templateUrl: 'modal/popup-ingredient.html',
        cssClass: 'hide-popup-head',
        scope: $scope,
        buttons: [{
          text: '<b>OK</b>',
          type: 'button-positive'
        }]
      });
      confirmPopup.then(function() {

      });
    }

    function saveConverter() {

      if ($rootScope.converter.from !== "0") {

        $rootScope.$broadcast(_LOADING_SPINNER_START_);

        var _item = {
          fromVal: $rootScope.converter.from,
          fromType: $rootScope.converter.from_type.code,
          toVal: $rootScope.converter.to,
          toType: $rootScope.converter.to_type.code,
          ingredient: $rootScope.converter.ingredient.id
        };

        SavingsFactory.addSaving(_item).then(function() {
          $rootScope.$broadcast(_LOADING_SPINNER_END_);
        }, function(error) {
          alert(error);
          $rootScope.$broadcast(_LOADING_SPINNER_END_);
        });
      }
    }

    if (window.cordova) {
      $cordovaSplashscreen.hide();
    }

  }
})(angular);
