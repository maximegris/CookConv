(function(angular, undefined) {
  'use strict';
  angular.module('directives').directive('pageLoader', pageLoader);

  pageLoader.$inject = [];

  function pageLoader() {

    var directive = {
      restrict: 'E',
      controller: pageLoaderController,
      controllerAs: 'pageLoaderVm',
      bindToController: true // because the scope is isolated
    };

    return directive;

  }

  /**
   * Injection de dépendances.
   */
  pageLoaderController.$inject = ['$scope', '$ionicLoading', '$timeout', '_LOADING_SPINNER_START_', '_LOADING_SPINNER_END_'];

  function pageLoaderController($scope, $ionicLoading, $timeout, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {

    $ionicLoading.hide();

    $scope.$on(_LOADING_SPINNER_START_, function(value) {
      $ionicLoading.show({
        template: '<div id="loading-spinner"><ion-spinner icon="lines"></ion-spinner><span>{{ "LOADER" | translate }}</span></div>',
      });
    });

    $scope.$on(_LOADING_SPINNER_END_, function(value) {
      $timeout(function() {$ionicLoading.hide();}, 500);
    });
  }
})(angular);
