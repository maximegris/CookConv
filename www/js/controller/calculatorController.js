// Controller of the Calculator Tab
angular.module('calculator.controller', ['ingredients.service']
).controller('CalculatorCtrl', function($scope, Ingredients) {

  $scope.current = {
    "from" : 0,
    "fromType": "Kg",
    "to" : 0,
    "toType": "Cl",
    "ingredient": "Eau",

    getTypeFrom : function() {
      return $scope.current.fromType;
    },
    getTypeTo : function() {
      return $scope.current.toType;
    },

  };

  $scope.ingredients = Ingredients.getIngredients();

})
