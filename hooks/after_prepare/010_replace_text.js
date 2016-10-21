#!/usr/bin/env node

// this plugin replaces arbitrary text in arbitrary files
//
// Look for the string CONFIGURE HERE for areas that need configuration
//

var fs = require('fs')
var path = require('path')

var rootdir = process.argv[2]

function replaceStringInFile(filename, toReplace, replaceWith) {
  var data = fs.readFileSync(filename, 'utf8')

  var result = data.replace(new RegExp(toReplace, 'g'), replaceWith)
  fs.writeFileSync(filename, result, 'utf8')
}

var target = 'stage'
if (process.env.TARGET) {
  target = process.env.TARGET
}

if (rootdir) {
  var ourconfigfile = path.join(rootdir, 'config', 'project.json')
  var configobj = JSON.parse(fs.readFileSync(ourconfigfile, 'utf8'))

  // CONFIGURE HERE
  // with the names of the files that contain tokens you want
  // replaced.  Replace files that have been copied via the prepare step.
  var filestoreplace = [
    // android
    'platforms/android/assets/www/index.html'
    // ios
    // others
  ]

  filestoreplace.forEach(function (val, index, array) {
    var fullfilename = path.join(rootdir, val)
    if (fs.existsSync(fullfilename)) {
      // CONFIGURE HERE
      // with the names of the token values. For example,
      // below we are looking for the token
      // /*REP*/ 'api.example.com' /*REP*/ and will replace
      // that token
      replaceStringInFile(fullfilename,
        '/\\*REP\\*/ "api.example.com" /\\*REP\\*/',
        configobj[target].datahostname)
      // ... any other configuration options
    } else {
      // console.log('missing: '+fullfilename);
    }
  })
}
