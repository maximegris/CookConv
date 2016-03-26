// Initialisation des modules
(function(angular, undefined) {
  'use strict';

  angular.module('constants', []);
  angular.module('db.config', []);
  angular.module('services', ['constants', 'db.config']);
  angular.module('directives', ['constants', 'services']);
  angular.module('starter', ['ionic', 'ngCordova', 'pascalprecht.translate', 'directives', 'templates'])
    .run(runApplication);

  runApplication.$inject = ['$ionicPlatform', '$cordovaSplashscreen'];

  /* @ngInject */
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
        window._db = window.openDatabase("db.cookconv.db", '1.0', 'My app', 5 * 1024 * 1024);
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

})(angular);
