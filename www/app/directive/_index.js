import Constants from '../constants'
import Services from '../service/_index'

import Application from './component/application.directive'
import Calculator from './component/calculator/calculator.directive'
import Savings from './component/savings/savings.directive'
import Settings from './component/settings/settings.directive'
import SettingsIngredients from './component/settings/ingredients/settings.ingredients.directive'
import SettingsLang from './component/settings/lang/settings.lang.directive'

import AppVersion from './common/appversion'
import HideTabs from './common/hidetabs'
import PageLoader from './common/pageloader'

const moduleName = 'app.directives'
angular.module(moduleName, [ Constants, Services ])

register(moduleName)
  .directive(Application.selector, Application.directive)
  .directive(Calculator.selector, Calculator.directive)
  .directive(Savings.selector, Savings.directive)
  .directive(Settings.selector, Settings.directive)
  .directive(SettingsIngredients.selector, SettingsIngredients.directive)
  .directive(SettingsLang.selector, SettingsLang.directive)
  .directive(AppVersion.selector, AppVersion.directive)
  .directive(HideTabs.selector, HideTabs.directive)
  .directive(PageLoader.selector, PageLoader.directive)

export default moduleName
