// Initialisation des modules
(function(angular, undefined) {
  'use strict';

  angular.module('constants', []);
  angular.module('db.config', []);
  angular.module('services', ['ionic', 'db.config', 'ngCordova']);
  angular.module('controllers', ['services']);
  angular.module('directives', ['constants']);
  angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'directives', 'controllers', 'services', 'templates'])
  .run(runApplication)
  .config(ionicConfig)
  .config(translateConfig)
  .config(stateConfig)
;

  runApplication.$inject = ['$ionicPlatform', '$cordovaSplashscreen'];

  function runApplication($ionicPlatform, $cordovaSplashscreen) {

    $ionicPlatform.ready(function() {

      if (window.cordova) {
        $cordovaSplashscreen.show();
      }

      if (window.cordova && window.sqlitePlugin) {
        //window.sqlitePlugin.deleteDatabase({
        //  name: "db.cookconv.db",
        //  location: 1
        //});
        window._db = window.sqlitePlugin.openDatabase({
          name: "db.cookconv.db",
          location: 2,
          androidLockWorkaround: 1
        });
      } else {
        window._db = window.openDatabase("db.cookconv.db", '1.0', 'My app', 5*1024*1024);
      }

      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        StatusBar.styleLightContent();
      }

    });
  }

  ionicConfig.$inject = ['$ionicConfigProvider', '$logProvider', '$compileProvider'];

  function ionicConfig($ionicConfigProvider, $logProvider, $compileProvider) {
    if (ionic.Platform.isAndroid()) {
      $logProvider.debugEnabled(false);
      $compileProvider.debugInfoEnabled(false);
    }

    // Cache
    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
  }

  translateConfig.$inject = ['$translateProvider'];

  function translateConfig($translateProvider) {
    $translateProvider
      .useStaticFilesLoader({
        prefix: 'assets/locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'fr', 'de', 'es', 'pt', 'zh'], {
        'en': 'en',
        'en_*': 'en',
        'EN_*': 'en',
        'En_*': 'en',
        'fr': 'fr',
        'fr_*': 'fr',
        'FR_*': 'fr',
        'Fr_*': 'fr',
        'de': 'de',
        'de_*': 'de',
        'DE_*': 'de',
        'De_*': 'de',
        'es': 'es',
        'es_*': 'es',
        'ES_*': 'es',
        'Es_*': 'es',
        'pt': 'pt',
        'pt_*': 'pt',
        'PT_*': 'pt',
        'Pt_*': 'pt',
        'zh': 'zh',
        'zh_*': 'zh',
        'ZH_*': 'zh',
        'Zh_*': 'zh',
      })
      .determinePreferredLanguage()
      .fallbackLanguage('en')
      .useSanitizeValueStrategy('escapeParameters');
  }

  stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function stateConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
      .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'tabs.html',
      resolve: {
        dbReady: function(DBFactory, $log, $rootScope, $translate, $cordovaSplashscreen) {
          // (1) init the DB
          return DBFactory.initDB()
            .then(function(success) {
              return DBFactory.getContextApplication(success, $translate.use());
            }, function(error) {
              alert('Failed initDB : ' + JSON.stringify(error));
            })
            .then(function(success) {
              $rootScope.init = true;
              $rootScope.settings = success[0];
              $rootScope.ingredients = success[1];
              $rootScope.types = success[2];

              if (window.cordova) {
                $cordovaSplashscreen.hide();
              }

            }, function(error) {
              alert('Failed getContextApplication: ' + JSON.stringify(error));
            });
        }
      }
    })

    // Each tab has its own nav history stack:
    .state('tab.calculator', {
      url: '/calculator',
      views: {
        'tab-calculator': {
          templateUrl: 'tab-calculator.html',
          controller: 'CalculatorController as calcvm'
        }
      }
    })

    .state('tab.savings', {
        url: '/savings',
        views: {
          'tab-savings': {
            templateUrl: 'tab-savings.html',
            controller: 'SavingsController as savingsvm'
          }
        }
      })
      .state('tab.settings', {
        url: '/settings',
        views: {
          'tab-settings': {
            templateUrl: 'tab-settings.html',
            controller: 'SettingsController as settingsvm'
          }
        }
      })
      .state('tab.settings-lang', {

        url: '/settings/lang',
        views: {
          'tab-settings': {
            templateUrl: 'settings/settings-lang.html',
            controller: 'SettingsLangController as langvm'
          }
        }

      })
      .state('tab.settings-ingredients', {

        url: '/settings/ingredients',
        views: {
          'tab-settings': {
            templateUrl: 'settings/settings-ingredients.html',
            controller: 'SettingsIngredientsController as ingredientsvm'
          }
        }

      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/calculator');
  }

})(angular);
