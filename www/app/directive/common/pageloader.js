class PageLoader {
  constructor() {
    this.restrict = 'E'
    this.scope = {}

    this.controller = PageLoaderController
    this.controllerAs = 'pageLoaderVm'
    this.bindToController = true
  }
}

class PageLoaderController {
  /* @ngInject */
  constructor($scope, $ionicLoading, $timeout, _LOADING_SPINNER_START_, _LOADING_SPINNER_END_) {
    $ionicLoading.hide()

    $scope.$on(_LOADING_SPINNER_START_, (value) => {
      $ionicLoading.show({
        template: '<div id="loading-spinner"><ion-spinner icon="lines"></ion-spinner><span translate="LOADER"></span></div>'
      })
    })

    $scope.$on(_LOADING_SPINNER_END_, (value) => {
      $timeout(() => {
        $ionicLoading.hide()
      }, 500)
    })
  }
}

export default {
  selector: 'pageLoader',
  directive: PageLoader
}
