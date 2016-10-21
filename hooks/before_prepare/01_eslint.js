#!/usr/bin/env node

var CLIEngine = require('eslint').CLIEngine

var eslint = new CLIEngine({
  'useEslintrc': true
})

var foldersToProcess = [
  'www/js/'
]

var report = eslint.executeOnFiles(foldersToProcess)
console.log(report)
if (report && report.results && report.results.length > 0) {
  var results = report.results
  for (var i = 0; i < results.length; i++) {
    var errors = results[i].messages
    if (errors && errors.length > 0) {
      console.log('Error in file ' + results[i].filePath)
      for (var j = 0; j < errors.length; j++) {
        if (errors[j] != null) console.log(severity(errors[j].severity) + ' : ' + errors[j].ruleId + ' -> ' + errors[j].message + ' -> line ' + errors[j].line + ' -> column ' + errors[j].column)
      }
      console.log('-----------------------------------------')
    }
  }
} else {
  console.log('Files have no errors.')
}

function severity(code) {
  if (code === 2) {
    return 'ERROR'
  } else {
    return 'WARNING'
  }
}
