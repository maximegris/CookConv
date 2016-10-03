#!/usr/bin/env node

// this hook installs all your plugins

// add your plugins to this list--either
// the identifier, the filesystem location
// or the URL
var pluginlist = [
  'cordova-plugin-device',
  'cordova-plugin-console',
  'cordova-plugin-splashscreen',
  'ionic-plugin-keyboard',
  'cordova-plugin-app-version',
  'cordova-plugin-statusbar',
  'cordova-plugin-whitelist',
  'cordova-sqlite-storage',
  'cordova-plugin-dbcopy',
  'cordova-plugin-code-push'
]

// no need to configure below

var sys = require('sys')
var exec = require('child_process').exec

function puts(error, stdout, stderr) {
  sys.puts(stdout)
}

pluginlist.forEach(function (plug) {
  exec('ionic plugin add ' + plug, puts)
})
