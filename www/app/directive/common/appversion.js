class AppVersion {
  /* @ngInject */
  constructor($ionicPlatform) {
    this.restrict = 'A'
    this.$ionicPlatform = $ionicPlatform
  }

  link(scope, element) {
    this.$ionicPlatform.ready(() => {
      if (cordova) {
        cordova.getAppVersion((version) => {
          element.text(version)
        })
      } else {
        element.text('browser.version-1.0.0')
      }
    })
  }
}

export default {
  selector: 'appVersion',
  directive: AppVersion
}
