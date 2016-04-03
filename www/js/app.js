// Initialisation des modules
(function(ionic, angular, cordova, undefined) {
  'use strict';

  window._start = false;

  angular.module('constants', []);
  angular.module('db.config', []);
  angular.module('services', ['constants', 'db.config']);
  angular.module('directives', ['constants', 'services']);
  angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'directives', 'templates'])
    .run(runApplication);

  runApplication.$inject = ['$ionicPlatform', '$cordovaSplashscreen', '$cordovaSQLite', '$state', '$ionicHistory', '$location'];

  /* @ngInject */
  function runApplication($ionicPlatform, $cordovaSplashscreen, $cordovaSQLite, $state, $ionicHistory, $location) {

    $ionicPlatform.ready(function() {

      if (cordova && window.plugins.sqlDB && window.sqlitePlugin) {

        window.plugins.sqlDB.copy("cookconv.sqlite", 1, function() {
          openDB();
        }, function(e) {
          //console.log("Error Code = " + JSON.stringify(e));
          openDB();
        });
      } else {
        openDB();
      }

      if (cordova && cordova.plugins && cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        window.StatusBar.styleLightContent();
      }

      $ionicPlatform.registerBackButtonAction(function(event) {
        var path = $location.path();
        if (path === "/tab/calculator") {
          ionic.Platform.exitApp();
        } else {
          $ionicHistory.goBack();
        }
      }, 100);

    });

    /**
     * Open Database.
     */
    function openDB() {
      if (cordova) {
        window._db = $cordovaSQLite.openDB({
          name: "cookconv.sqlite",
          location: 1
        });
      } else {
        window._db = window.openDatabase("cookconv.sqlite", '1.0', 'My app', 5 * 1024 * 1024);
      }
      $state.go("tab.calculator");
    }
  }


})(ionic, angular, window.cordova);
