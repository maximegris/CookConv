(function(angular, undefined) {
  'use strict';

  angular.module('services').factory('CalculatorFactory', CalculatorFactory);

  CalculatorFactory.$inject = [];

  /* @ngInject */
  function CalculatorFactory() {

    var _converter;
    var _ingredients;
    var _types;

    return ({
      init: init,
      getConverter: getConverter,
      setConverter: setConverter,
      getTypeFrom: getTypeFrom,
      getTypeTo: getTypeTo,
      getIngredients: getIngredients,
      getTypes: getTypes
    });

    function init(ingredients, types) {

      _ingredients = ingredients;
      _types = types;

      _converter = {
        "from": "0",
        "from_type": _types[0],
        "to": "0",
        "to_type": _types[3],
        "ingredient": _ingredients[0]
      };
    }

    function getConverter() {
      return _converter;
    }

    function setConverter(converter) {
      _converter = converter;
    }

    function getTypeFrom() {
      return _converter.from_type.code;
    }

    function getTypeTo() {
      return _converter.to_type.code;
    }

    function getIngredients() {
      return _ingredients;
    }

    function getTypes() {
      return _types;
    }

  }
})(angular);
