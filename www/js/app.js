// Ionic Starter App

var translations = {
  TAB_TITLE_CALCULATOR : "Testtttttt",
  TAB_TITLE_SAVINGS : "Savings",
  TAB_TITLE_PARAMETERS : "Settings",
};

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular mail module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// load ngCordova (used for DB storage ...)
var _db = null;

angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'app.directives', 'db.service', 'calculator.controller', 'savings.controller', 'settings.controller', 'settings.lang.controller'])

.run(function($ionicPlatform, $cordovaSQLite, DBFactory) {
    $ionicPlatform.ready(function() {

    //isIPad = ionic.Platform.isIPad();
    //isIOS = ionic.Platform.isIOS();
    //isAndroid = ionic.Platform.isAndroid();
    //isWindowsPhone = ionic.Platform.isWindowsPhone();

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    if(window.cordova){
      //alert("SQLite plugin detected");
      $cordovaSQLite.deleteDB("cookconv.db");
      _db = $cordovaSQLite.openDB("cookconv.db");
    }
    else {
      //alert("WebSQL db is called");
     _db = window.openDatabase("cookconv.db", '1.0', 'My app', -1);
    }

    // Chargement i18n

  });
})

.config(function($ionicConfigProvider, $logProvider, $compileProvider, $stateProvider, $urlRouterProvider, $translateProvider) {


  if(ionic.Platform.isWebView()) {
      $logProvider.debugEnabled(false);
      $compileProvider.debugInfoEnabled(false);
  }

  $ionicConfigProvider.views.maxCache(0)
  $ionicConfigProvider.tabs.position('bottom');

  $translateProvider
      .useStaticFilesLoader({
        prefix: 'locales/',
        suffix: '.json'
      })
      .registerAvailableLanguageKeys(['en', 'fr', 'de'], {
        'en' : 'en', 'en_GB': 'en', 'en_US': 'en',
        'fr' : 'fr', 'fr_FR': 'fr',
        'de' : 'de', 'de_DE': 'de', 'de_CH': 'de',
      })
      .preferredLanguage('fr')
      .fallbackLanguage('fr')
      .determinePreferredLanguage()
      .useSanitizeValueStrategy('escapeParameters');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  $stateProvider
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: {
      dbReady: function(DBFactory, $log){
        // (1) init the DB
        return DBFactory.initDB().then(
          function(success) {
          $log.debug('Success load DB : ' + success);
        },
        function(reason) {
            $log.debug('Failed: ' + reason);
        });
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('tab.calculator', {
    url: '/calculator',
    views: {
      'tab-calculator': {
        templateUrl: 'templates/tab-calculator.html',

        controller: 'CalculatorCtrl'
      }
    }
  })

  .state('tab.save', {
    url: '/save',
    views : {
      'tab-save': {
        templateUrl: 'templates/tab-save.html',
        controller: 'SavingsCtrl'
      }
    }
  })
  .state('tab.parameters', {
    url: '/parameters',
    views: {
      'tab-parameters': {
        templateUrl: 'templates/tab-parameters.html',
        controller: 'SettingsCtrl'
      }
    }
  })
  .state('tab.parameters-lang', {

    url: '/parameter/lang',
    views: {
      'tab-parameters': {
        templateUrl: 'templates/parameters-lang.html',
        controller: 'SettingsLangCtrl'
      }
    }

  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/calculator');

})
.controller('LoadCtrl', function($rootScope, $ionicLoading) {
  $rootScope.show = function() {
    $ionicLoading.show({
      template: '<div id="loading-spinner"><ion-spinner icon="lines"></ion-spinner> <span>Loading... Please wait</span></div>',
    });
  };
  $rootScope.hide = function(){
    $ionicLoading.hide();
  };
});
