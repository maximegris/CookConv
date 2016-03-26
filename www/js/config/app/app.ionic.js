(function(angular, undefined) {
  'use strict';

  angular.module('starter')
    .config(ionicConfig);

  ionicConfig.$inject = ['$ionicConfigProvider', '$logProvider', '$compileProvider'];

  /* @ngInject */
  function ionicConfig($ionicConfigProvider, $logProvider, $compileProvider) {
    // If WebView, we disable log & use native scrolling
    if (ionic.Platform.isWebView()) {
      $logProvider.debugEnabled(false);
      $compileProvider.debugInfoEnabled(false);
      $ionicConfigProvider.scrolling.jsScrolling(false);
    }

    // Cache
    $ionicConfigProvider.views.transition('none');
    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
  }

})(angular);
