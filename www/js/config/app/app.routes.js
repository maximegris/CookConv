(function (ionic, angular, undefined) {
  'use strict'

  angular.module('starter').config(stateConfig)

  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider']

  /* @ngInject */
  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('init', {
        url: '/',
        template: ''
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'directive/component/tabs.html',
        resolve: {
          dbReady: dbReady
        }
      })
      // Each tab has its own nav history stack:
      .state('tab.calculator', {
        url: '/calculator',
        views: {
          'tab-calculator': {
            template: '<calculator></calculator>'
          }
        }
      })
      .state('tab.savings', {
        url: '/savings',
        views: {
          'tab-savings': {
            template: '<savings></savings>'
          }
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            template: '<settings></settings>'
          }
        }
      })
      .state('tab.settings-lang', {

        url: '/settings/lang',
        views: {
          'tab-settings': {
            template: '<settings-lang><settings-lang>'
          }
        }
      })
      .state('tab.settings-ingredients', {

        url: '/settings/ingredients',
        views: {
          'tab-settings': {
            template: '<settings-ingredients><settings-ingredients>'
          }
        }
      })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/calculator')

    function dbReady($ionicPlatform, $translate, $log, DBFactory, CalculatorFactory, SettingsFactory) {
      return DBFactory.getContextApplication(true, $translate.use())
        .then(function (success) {
          if (success) {
            SettingsFactory.setLocalSettings(success[0])
            CalculatorFactory.init(success[1], success[2])
          }
        }, function (err) {
          $log.error('Failed getContextApplication: ' + JSON.stringify(err))
        })
    }
  }
})(ionic, angular);
