var _db = null;

angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'app.directives', 'db.service', 'calculator.controller', 'savings.controller', 'settings.controller', 'settings.lang.controller', 'settings.unit.controller', 'templates'])

.run(function($ionicPlatform, $cordovaSQLite) {
  'use strict';

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleLightContent();
    }

    if(window.cordova){
      $cordovaSQLite.deleteDB("cookconv.db");
      _db = $cordovaSQLite.openDB("cookconv.db");
    }
    else {
      _db = window.openDatabase("cookconv.db", '1.0', 'My app', -1);
    }

  });
})

.config(function($ionicConfigProvider, $logProvider, $compileProvider, $stateProvider, $urlRouterProvider, $translateProvider) {
  'use strict';

  if(ionic.Platform.isWebView()) {
    $logProvider.debugEnabled(false);
    $compileProvider.debugInfoEnabled(false);
  }

  // Cache
  $ionicConfigProvider.views.maxCache(0);

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.backButton.previousTitleText(false).text('');

  $translateProvider
  .useStaticFilesLoader({
    prefix: 'locales/',
    suffix: '.json'
  })
  .registerAvailableLanguageKeys(['en', 'fr', 'de'], {
    'en' : 'en', 'en_*': 'en',
    'fr' : 'fr', 'fr_*': 'fr',
    'de' : 'de', 'de_*': 'de',
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
      dbReady: function(DBFactory, $log, $rootScope){
        // (1) init the DB
        return DBFactory.initDB()
        .then(function(success) { return DBFactory.getContextApplication(success); }, function(error) { alert('Failed initDB : ' + JSON.stringify(error));  })
        .then(function(success) {
          $rootScope.settings = success[0];
          $rootScope.ingredients = success[1];
          $rootScope.types  = success[2];

        }, function(error) { alert('Failed getContextApplication: ' +  JSON.stringify(error)); });
      }
    }
  })

  // Each tab has its own nav history stack:
  .state('tab.calculator', {
    url: '/calculator',
    views: {
      'tab-calculator': {
        templateUrl: 'tab-calculator.html',

        controller: 'CalculatorCtrl'
      }
    }
  })

  .state('tab.save', {
    url: '/save',
    views : {
      'tab-save': {
        templateUrl: 'tab-save.html',
        controller: 'SavingsCtrl'
      }
    }
  })
  .state('tab.parameters', {
    url: '/parameters',
    views: {
      'tab-parameters': {
        templateUrl: 'tab-parameters.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  .state('tab.parameters-lang', {

    url: '/parameter/lang',
    views: {
      'tab-parameters': {
        templateUrl: 'parameters-lang.html',
        controller: 'SettingsLangCtrl'
      }
    }

  }).state('tab.parameters-unit', {

    url: '/parameter/unit',
    views: {
      'tab-parameters': {
        templateUrl: 'parameters-unit.html',
        controller: 'SettingsUnitCtrl'
      }
    }

  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/calculator');

})
.controller('LoadCtrl',
function($rootScope, $ionicLoading, $translate) {
  'use strict';
  $rootScope.show = function() {
    $ionicLoading.show({
      template: '<div id="loading-spinner"><ion-spinner icon="lines"></ion-spinner><span>{{ "LOADER" | translate }}</span></div>',
    });
  };
  $rootScope.hide = function(){
    $ionicLoading.hide();
  };
});
