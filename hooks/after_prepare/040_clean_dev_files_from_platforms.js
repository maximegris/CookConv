#!/usr/bin/env node

/**
 * After prepare, files are copied to the platforms/ios and platforms/android folders.
 * Lets clean up some of those files that arent needed with this hook.
 */
var fs = require('fs')
var path = require('path')


var deleteFolderRecursive = function (removePath) {
  if (fs.existsSync(removePath)) {
    fs.readdirSync(removePath).forEach(function (file, index) {
      var curPath = path.join(removePath, file)
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath)
      } else { // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(removePath)
  }
}

// var iosPlatformsDir1 = path.resolve(__dirname, '../../platforms/ios/www/css')
// var iosPlatformsDir2 = path.resolve(__dirname, '../../platforms/ios/www/js')
// var iosPlatformsDir3 = path.resolve(__dirname, '../../platforms/ios/www/lib')
// var iosPlatformsDir4 = path.resolve(__dirname, '../../platforms/ios/www/templates')
// var iosPlatformsDir5 = path.resolve(__dirname, '../../platforms/ios/www/dist/dist_js/app')
// var iosPlatformsDir6 = path.resolve(__dirname, '../../platforms/ios/www/assets')
var androidPlatformsDir1 = path.resolve(__dirname, '../../platforms/android/assets/www/css')
var androidPlatformsDir2 = path.resolve(__dirname, '../../platforms/android/assets/www/js')
var androidPlatformsDir3 = path.resolve(__dirname, '../../platforms/android/assets/www/lib')
var androidPlatformsDir4 = path.resolve(__dirname, '../../platforms/android/assets/www/templates')
var androidPlatformsDir5 = path.resolve(__dirname, '../../platforms/android/assets/www/dist/dist_js/app')
var androidPlatformsDir6 = path.resolve(__dirname, '../../platforms/android/assets/www/assets')

// deleteFolderRecursive(iosPlatformsDir1)
// deleteFolderRecursive(iosPlatformsDir2)
// deleteFolderRecursive(iosPlatformsDir3)
// deleteFolderRecursive(iosPlatformsDir4)
// deleteFolderRecursive(iosPlatformsDir5)
// deleteFolderRecursive(iosPlatformsDir6)
deleteFolderRecursive(androidPlatformsDir1)
deleteFolderRecursive(androidPlatformsDir2)
deleteFolderRecursive(androidPlatformsDir3)
deleteFolderRecursive(androidPlatformsDir4)
deleteFolderRecursive(androidPlatformsDir5)
deleteFolderRecursive(androidPlatformsDir6)
