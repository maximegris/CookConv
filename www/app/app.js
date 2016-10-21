import 'ionic-sdk/release/js/ionic.bundle'
import 'ng-cordova'
import uiRouter from 'angular-ui-router'
import 'angular-translate'
import 'angular-translate-loader-static-files'

import Directives from './directive/_index'

import IonicConfig from './config/app.ionic'
import StateConfig from './config/app.routes'
import TranslateConfig from './config/app.translate'
import RunApplication from './config/app.run'

angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', uiRouter, Directives])
  .config(IonicConfig)
  .config(StateConfig)
  .config(TranslateConfig)
  .run(RunApplication)

