#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var filestocopy = [{
  'resources/icon.png': 'platforms/android/res/drawable/icon.png'
}, {
  'resources/android/icon/drawable-hdpi/drawable-hdpi-icon.png': 'platforms/android/res/drawable-hdpi/icon.png'
}, {
  'resources/android/icon/drawable-ldpi/drawable-ldpi-icon.png': 'platforms/android/res/drawable-ldpi/icon.png'
}, {
  'resources/android/icon/drawable-mdpi/drawable-mdpi-icon.png': 'platforms/android/res/drawable-mdpi/icon.png'
}, {
  'resources/android/icon/drawable-xhdpi/drawable-xhdpi-icon.png': 'platforms/android/res/drawable-xhdpi/icon.png'
}, {
  'resources/splash.png': 'platforms/android/res/drawable/splash.png'
}, {
  'resources/android/splash/drawable-port-hdpi-screen.png': 'platforms/android/res/drawable-port-hdpi/splash.png'
}, {
  'resources/android/splash/drawable-port-ldpi-screen.png': 'platforms/android/res/drawable-port-ldpi/splash.png'
}, {
  'resources/android/splash/drawable-port-mdpi-screen.png': 'platforms/android/res/drawable-port-mdpi/splash.png'
}, {
  'resources/android/splash/drawable-port-xhdpi-screen.png': 'platforms/android/res/drawable-port-xhdpi/splash.png'
}]

// no need to configure below
var rootdir = process.argv[2]

filestocopy.forEach(function (obj) {
  Object.keys(obj).forEach(function (key) {
    var val = obj[key]
    var srcfile = path.join(rootdir, key)
    var destfile = path.join(rootdir, val)
    // console.log('copying '+srcfile+' to '+destfile)
    var destdir = path.dirname(destfile)
    if (fs.existsSync(srcfile) && fs.existsSync(destdir)) {
      fs.createReadStream(srcfile).pipe(
        fs.createWriteStream(destfile))
    }
  })
})
