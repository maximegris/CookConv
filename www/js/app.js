// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular mail module (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// load ngCordova (used for DB storage ...)
var _db = null;

angular.module('starter', ['ionic', 'ngCordova',  'db.service', 'calculator.controller', 'save.controller'])

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

  });
})

.config(function($stateProvider, $urlRouterProvider) {

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
        return DBFactory.initDB().then(function(success) {
          //alert(success);
          $log.debug('Success: ' + success);
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
/*        resolve: {
            // (2) note that we MUST inject the dbReady promise, if we don't this will instantiate immediately
            ingredients: function(dbReady, Ingredients){
              // the following call returns a promise
              return Ingredients.getIngredients();
          }
        },*/
        controller: 'CalculatorCtrl'
      }
    }
  })

  .state('tab.save', {
    url: '/save',
    views : {
      'tab-save': {
        templateUrl: 'templates/tab-save.html',
        controller: 'SaveCtrl'
      }
    }
  })

  .state('tab.parameters', {
    url: '/parameters',
    views: {
      'tab-parameters': {
        templateUrl: 'templates/tab-parameters.html',
        controller: 'ParametersCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/calculator');

});
