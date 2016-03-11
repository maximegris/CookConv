var _db = null;

angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'app.directives', 'db.service', 'calculator.controller', 'savings.controller', 'settings.controller', 'settings.lang.controller', 'settings.ingredients.controller', 'templates']).run(function($ionicPlatform, $cordovaSQLite, $cordovaSplashscreen) {
  'use strict';

  $ionicPlatform.ready(function() {

    if (window.cordova) {
      $cordovaSplashscreen.show();
    }

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }

    if (window.cordova) {
      $cordovaSQLite.deleteDB("cookconv.db");
      _db = $cordovaSQLite.openDB("db.cookconv.db");
    } else {
      _db = window.openDatabase("db.cookconv.db", '1.0', 'My app', -1);
    }

  });
}).config(function($ionicConfigProvider, $logProvider, $compileProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
  'use strict';

  if (ionic.Platform.isAndroid()) {
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }

  // Cache
  $ionicConfigProvider.views.transition('none');
  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

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
        controller: 'CalculatorCtrl as calcvm'
      }
    }
  })

  .state('tab.savings', {
      url: '/savings',
      views: {
        'tab-savings': {
          templateUrl: 'tab-savings.html',
          controller: 'SavingsCtrl as savingsvm'
        }
      }
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'tab-settings.html',
          controller: 'SettingsCtrl as settingsvm'
        }
      }
    })
    .state('tab.settings-lang', {

      url: '/settings/lang',
      views: {
        'tab-settings': {
          templateUrl: 'settings/settings-lang.html',
          controller: 'SettingsLangCtrl as langvm'
        }
      }

    })
    .state('tab.settings-ingredients', {

      url: '/settings/ingredients',
      views: {
        'tab-settings': {
          templateUrl: 'settings/settings-ingredients.html',
          controller: 'SettingsIngredientsCtrl as ingredientsvm'
        }
      }

    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/calculator');

}).controller('LoadCtrl', function($rootScope, $ionicLoading) {
  'use strict';
  $rootScope.show = function() {
    $ionicLoading.show({
      template: '<div id="loading-spinner"><ion-spinner icon="lines"></ion-spinner><span>{{ "LOADER" | translate }}</span></div>',
    });
  };
  $rootScope.hide = function() {
    $ionicLoading.hide();
  };
});
