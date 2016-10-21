export default class CalculatorService {
  /* @ngInject */
  constructor() {
    this._converter = null
    this._ingredients = null
    this._types = null
  }

  init(ingredients, types) {
    this._ingredients = ingredients
    this._types = types

    this._converter = {
      'from': '0',
      'from_type': this._types[0],
      'to': '0',
      'to_type': this._types[3],
      'ingredient': this._ingredients[0]
    }
  }

  getConverter() {
    return this._converter
  }

  setConverter(converter) {
    this._converter = converter
  }

  getTypeFrom() {
    return this._converter.from_type.code
  }

  getTypeTo() {
    return this._converter.to_type.code
  }

  getIngredients() {
    return this._ingredients
  }

  setIngredients(ingredients) {
    this._ingredients = ingredients
  }

  getTypes() {
    return this._types
  }

  setTypes(types) {
    this._types = types
  }
}
