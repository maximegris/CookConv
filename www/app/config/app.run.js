/* @ngInject */
function runApplication($ionicPlatform, $cordovaSplashscreen, $cordovaSQLite, $state, $ionicHistory, $location) {
  $ionicPlatform.ready(() => {
    // if (window.codePush) {
    //   window.codePush.sync(null, { updateDialog: true, installMode: InstallMode.IMMEDIATE })
    // }

    if (window.cordova && window.plugins.sqlDB && window.sqlitePlugin) {
      window.plugins.sqlDB.copy('cookconv.sqlite', 1, () => {
        openDB()
      }, (e) => {
        console.log('Error Code = ' + JSON.stringify(e))
        openDB()
      })
    } else {
      openDB()
    }

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true)
      window.cordova.plugins.Keyboard.disableScroll(true)
    }

    if (window.StatusBar) {
      window.StatusBar.styleLightContent()
    }

    $ionicPlatform.registerBackButtonAction((event) => {
      var path = $location.path()
      if (path === '/tab/calculator') {
        ionic.Platform.exitApp()
      } else {
        $ionicHistory.goBack()
      }
    }, 100)
  })

  /**
   * Open Database.
   */
  function openDB() {
    if (window.cordova) {
      window._db = $cordovaSQLite.openDB({
        name: 'cookconv.sqlite',
        location: 1
      })
    } else {
      window._db = window.openDatabase('cookconv.sqlite', '1.0', 'My app', 5 * 1024 * 1024)
    }
    $state.go('tab.calculator')
  }
}

export default runApplication
