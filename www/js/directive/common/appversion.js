(function (angular, cordova, undefined) {
  'use strict'

  angular.module('directives').directive('appVersion', appVersion)

  appVersion.$inject = ['$ionicPlatform']

  /* @ngInject */
  function appVersion($ionicPlatform) {
    return function (scope, elm) {
      $ionicPlatform.ready(function () {
        if (cordova) {
          cordova.getAppVersion(function (version) {
            elm.text(version)
          })
        } else {
          elm.text('browser.version-1.0.0')
        }
      })
    }
  }
})(angular, cordova);
