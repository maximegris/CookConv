angular.module('controllers').controller('LoadCtrl', function($rootScope, $ionicLoading) {
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
