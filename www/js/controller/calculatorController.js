// Controller de l'onglet Calculator
angular.module('calculator.controller', ['ingredients.service', 'types.service']
).controller('CalculatorCtrl', function($controller, $rootScope, $scope, $q, $ionicPopup, Ingredients, Types) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  // Injection du controller de chargement
  $controller('LoadCtrl');

  $rootScope.show();


  $scope.addValCalc = function(value) {
    if($scope.current.from === "0" && value !== "0") {

      if(value === ".") {
          $scope.current.from = "0.";
      } else {
        $scope.current.from = value;
      }

    } else if ($scope.current.from !== "0") {

      if(value !== "." || (value === "." && $scope.current.from.indexOf(".") === -1)) {
        $scope.current.from += value;
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

    $scope.current.from = $scope.current.to;
    $scope.current.to = tmp;

  };

  $q.all([Ingredients.getIngredients(), Types.getTypes("from"), Types.getTypes("to")])
  .then(function(result) {
    $scope.ingredients = result[0];
    $scope.typesFrom  = result[1];
    $scope.typesTo = result[2];


    $scope.current = {
      "from" : "0",
      "from_type": $scope.typesFrom[0],
      "to" : "0",
      "to_type": $scope.typesTo[3],
      "ingredient": $scope.ingredients[1],

      getTypeFrom : function() {
        return $scope.current.from_type.code;
      },
      getTypeTo : function() {
        return $scope.current.to_type.code;
      },

    };

    $rootScope.hide();
  });




  $scope.showFromType = function() {
     var confirmPopup = $ionicPopup.show({
        template: '<ion-list> <ion-radio ng-model="current.from_type" ng-repeat="type in typesFrom track by type.id" ng-value="type" name="{{type.id_radio}}"> {{type.name}} </ion-radio> </ion-list>',
        title: 'Select a measure (FROM)',
        scope: $scope,
        buttons: [
          {
            text: '<b>Back</b>',
            type: 'button-positive'
          }
        ]
      });
     confirmPopup.then(function(res) {

     });
   };

   $scope.showToType = function() {
      var confirmPopup = $ionicPopup.show({
         template: '<ion-list> <ion-radio ng-model="current.to_type" ng-repeat="type in typesTo track by type.id" ng-value="type" name="{{type.id_radio}}"> {{type.name}} </ion-radio> </ion-list>',
         title: 'Select a measure (TO)',
         scope: $scope,
         buttons: [
           {
             text: '<b>Back</b>',
             type: 'button-positive'
           }
         ]
       });
      confirmPopup.then(function(res) {

      });
    };

   $scope.$watch('current.from_type', calculateConversion, false);
   $scope.$watch('current.to_type', calculateConversion, false);
   $scope.$watch('current.ingredient', calculateConversion, false);

   function calculateConversion(){
     if($scope.current) {
       var _from_val = $scope.current.from;
       var _from = $scope.current.from_type;
       var _to_val = $scope.current.to;
       var _to = $scope.current.to_type;
       var _ingredient = $scope.current.ingredient;

       if(_from_val === "0") {
         $scope.current.to = "0";
       } else {

         // On compare les types des mesures pour savoir comment on effectue le calcul de conversion
         // Utilisation de Math.floor & facteur pour afficher correctement les valeurs (meême toutes petites soient elles)
         if(_from.type === _to.type) {
            $scope.current.to = Math.floor(1000000 * (_from_val * _to.rapport / _from.rapport)) / 1000000;
         } else if (_from.type == "poids") {
           $scope.current.to = Math.floor(1000000 * (_from_val * _to.rapport / (_from.rapport * _ingredient.masse_volumique))) / 1000000;
         } else {
           $scope.current.to = Math.floor(1000000 * (_from_val * _to.rapport * _ingredient.masse_volumique / _from.rapport)) / 1000000;
         }
       }

     }

    };
});
