import Constants from '../constants'

import CalculatorService from './calculator.service'
import DBService from './db.service'
import IngredientsService from './ingredients.service'
import LanguagesService from './languages.service'
import SavingsService from './savings.service'
import SettingsService from './settings.service'
import TypesService from './types.service'

const moduleName = 'app.services'
angular.module(moduleName, [Constants])

register(moduleName)
  .service(CalculatorService.name, CalculatorService)
  .service(DBService.name, DBService)
  .service(IngredientsService.name, IngredientsService)
  .service(LanguagesService.name, LanguagesService)
  .service(SavingsService.name, SavingsService)
  .service(SettingsService.name, SettingsService)
  .service(TypesService.name, TypesService)

export default moduleName
