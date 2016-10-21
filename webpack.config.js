module.exports = {
  devtool: 'sourcemap',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders: [
       { test: /\.js$/, exclude: [/www\/lib/, /node_modules/], loaders: ['ng-annotate', 'babel'] },
       { test: /\.html$/, exclude: [/www\/lib/, /node_modules/], loaders: ['htmlhint', 'raw'] },
       { test: /\.styl$/, loaders: ['style', 'css', 'stylus'] },
       { test: /\.css$/, loaders: ['style', 'css'] },
       { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
    ]
  }
}
