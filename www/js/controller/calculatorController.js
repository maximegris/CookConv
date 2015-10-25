// Controller de l'onglet Calculator
angular.module('calculator.controller', ['savings.service']
).controller('CalculatorCtrl', function($controller, $rootScope, $scope, $q, $ionicPopup, $cordovaSplashscreen, Savings) {
  'use strict';

  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // IoC
  $controller('LoadCtrl');

  // Methodes privees
  function calculateConversion(){
    if($scope.current) {
      var _from_val = $scope.current.from;
      var _from = $scope.current.from_type;
      var _to = $scope.current.to_type;
      var _ingredient = $scope.current.ingredient;

      if(_from_val === "0") {
        $scope.current.to = "0";
      } else {

        // On compare les types des mesures pour savoir comment on effectue le calcul de conversion
        // Utilisation de Math.floor & facteur pour afficher correctement les valeurs (meme toutes petites soient elles)
        if(_from.type === _to.type) {
          $scope.current.to = (Math.floor(1000000 * (_from_val * _to.rapport / _from.rapport)) / 1000000).toString();
        } else if (_from.type === "poids") {
          $scope.current.to = (Math.floor(1000000 * (_from_val * _to.rapport / (_from.rapport * _ingredient.masse_volumique))) / 1000000).toString();
        } else {
          $scope.current.to = (Math.floor(1000000 * (_from_val * _to.rapport * _ingredient.masse_volumique / _from.rapport)) / 1000000).toString();
        }
      }
    }
  }

  // scope
  $scope.addValCalc = function(value) {

    var lengthVal = $scope.current.from.length;


    if(lengthVal <= 5) {
      if($scope.current.from === "0" && value !== "0") {

        if(value === ".") {
          $scope.current.from = "0.";
        } else {
          $scope.current.from = value;
        }

      } else if ($scope.current.from !== "0") {

        if(value !== "." || (value === "." && lengthVal !== 5 && $scope.current.from.indexOf(".") === -1)) {
          $scope.current.from += value;
        }

      }
    }

    calculateConversion();
  };

  $scope.removeValCalc = function(all) {
    if(all) {
      $scope.current.from = "0";
      $scope.current.to = "0";
    } else {
      if($scope.current.from.length > 1) {
        $scope.current.from = $scope.current.from.substring(0, $scope.current.from.length-1);
      } else {
        $scope.current.from = "0";
      }

      calculateConversion();
    }

  };

  $scope.inverseVal = function() {
    var tmp = $scope.current.from,
    tmp_type = $scope.current.from_type;

    $scope.current.from_type = $scope.current.to_type;
    $scope.current.to_type = tmp_type;

    $scope.current.from = $scope.current.to.toString();
    $scope.current.to = tmp.toString();

  };

  $scope.current = {
    "from" : "0",
    "from_type": $rootScope.types[0],
    "to" : "0",
    "to_type": $rootScope.types[3],
    "ingredient": $rootScope.ingredients[1],

    getTypeFrom : function() {
      return $scope.current.from_type.code;
    },
    getTypeTo : function() {
      return $scope.current.to_type.code;
    },

  };

  $scope.showFromType = function() {
    var confirmPopup = $ionicPopup.show({
      templateUrl: 'popup-from.html',
      cssClass: 'hide-popup-head',
      scope: $scope,
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive'
        }
      ]
    });
    confirmPopup.then(function() {

    });
  };

  $scope.showToType = function() {
    var confirmPopup = $ionicPopup.show({
      templateUrl: 'popup-to.html',
      cssClass: 'hide-popup-head',
      scope: $scope,
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive'
        }
      ]
    });
    confirmPopup.then(function() {

    });
  };

  $scope.showIngredient = function() {
    var confirmPopup = $ionicPopup.show({
      templateUrl: 'popup-ingredient.html',
      cssClass: 'hide-popup-head',
      scope: $scope,
      buttons: [
        {
          text: '<b>OK</b>',
          type: 'button-positive'
        }
      ]
    });
    confirmPopup.then(function() {

    });
  };

  $scope.saveConverter = function() {

    if($scope.current.from !== "0"){

      $rootScope.show();

      var _item = {
        fromVal : $scope.current.from,
        fromType : $scope.current.from_type.code,
        toVal : $scope.current.to,
        toType : $scope.current.to_type.code,
        ingredient : $scope.current.ingredient.id
      };

      Savings.addSaving(_item).then(function(){
          setTimeout($rootScope.hide(), 500);
      }, function(error) {
        alert(error);
      });
    }

  };

  $scope.$watch('current.from_type', calculateConversion, false);
  $scope.$watch('current.to_type', calculateConversion, false);
  $scope.$watch('current.ingredient', calculateConversion, false);


  if(window.cordova) {
    setTimeout($cordovaSplashscreen.hide(), 1000);
  }

});
