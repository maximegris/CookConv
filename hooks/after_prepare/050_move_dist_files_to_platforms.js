#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var path = require('path')
var mv = require('mv')

var mvDistFileToPlatform = function (src, dest, platform) {
  mv(src, dest, {
    mkdirp: true
  }, function (err) {
    if (typeof err !== 'undefined') {
      console.log('err')
      console.log(err)
      console.log('ERROR when moving CSS folder to ' + platform + ' platform')
    } else {
      console.log('CSS folder moved OK to ' + platform + ' platform')
    }
  })
}

// var iosPlatformsDirDist_css = path.resolve(__dirname, '../../platforms/ios/www/dist/dist_css')
// var iosPlatformsDirDistJs = path.resolve(__dirname, '../../platforms/ios/www/dist/dist_js')
// var iosPlatformsDirDistLib = path.resolve(__dirname, '../../platforms/ios/www/dist/lib')
// var iosPlatformsDirDistAssets = path.resolve(__dirname, '../../platforms/ios/www/dist/assets')
// var iosPlatformsDirDistIndex = path.resolve(__dirname, '../../platforms/ios/www/dist/index.html')
// var iosPlatformsDirWwwCss = path.resolve(__dirname, '../../platforms/ios/www/dist_css')
// var iosPlatformsDirWwwJs = path.resolve(__dirname, '../../platforms/ios/www/dist_js')
// var iosPlatformsDir_www_lib = path.resolve(__dirname, '../../platforms/ios/www/lib')
// var iosPlatformsDir_www_assets = path.resolve(__dirname, '../../platforms/ios/www/assets')
// var iosPlatformsDirWwwIndex = path.resolve(__dirname, '../../platforms/ios/www/index.html')

//console.log('Moving dist files to iOS platform')
// mvDistFileToPlatform(iosPlatformsDirDistCss, iosPlatformsDirWwwCss, 'ios')
// mvDistFileToPlatform(iosPlatformsDirDistJs, iosPlatformsDirWwwJs, 'ios')
// mvDistFileToPlatform(iosPlatformsDirDistLib, iosPlatformsDir_www_lib, 'ios')
// mvDistFileToPlatform(iosPlatformsDirDistAssets, iosPlatformsDir_www_assets, 'ios')
// mvDistFileToPlatform(iosPlatformsDirDistIndex, iosPlatformsDirWwwIndex, 'ios')


var androidPlatformsDirDistCss = path.resolve(__dirname, '../../platforms/android/assets/www/dist/dist_css')
var androidPlatformsDirDistJs = path.resolve(__dirname, '../../platforms/android/assets/www/dist/dist_js')
var androidPlatformsDirDistLib = path.resolve(__dirname, '../../platforms/android/assets/www/dist/lib')
var androidPlatformsDirDistAssets = path.resolve(__dirname, '../../platforms/android/assets/www/dist/assets')
var androidPlatformsDirDistIndex = path.resolve(__dirname, '../../platforms/android/assets/www/dist/index.html')
var androidPlatformsDirWwwCss = path.resolve(__dirname, '../../platforms/android/assets/www/dist_css')
var androidPlatformsDirWwwJs = path.resolve(__dirname, '../../platforms/android/assets/www/dist_js')
var androidPlatformsDirWwwLib = path.resolve(__dirname, '../../platforms/android/assets/www/lib')
var androidPlatformsDirWwwAssets = path.resolve(__dirname, '../../platforms/android/assets/www/assets')
var androidPlatformsDirWwwIndex = path.resolve(__dirname, '../../platforms/android/assets/www/index.html')

console.log('Moving dist files to Android platform')
mvDistFileToPlatform(androidPlatformsDirDistCss, androidPlatformsDirWwwCss, 'android')
mvDistFileToPlatform(androidPlatformsDirDistJs, androidPlatformsDirWwwJs, 'android')
mvDistFileToPlatform(androidPlatformsDirDistLib, androidPlatformsDirWwwLib, 'android')
mvDistFileToPlatform(androidPlatformsDirDistAssets, androidPlatformsDirWwwAssets, 'android')
mvDistFileToPlatform(androidPlatformsDirDistIndex, androidPlatformsDirWwwIndex, 'android')
