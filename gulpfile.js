var gulp = require('gulp')
var runSequence = require('run-sequence')
var del = require('del')
var stylish = require('jshint-stylish') // Lint your javascript

var cleanCSS = require('gulp-clean-css') // Minify CSS
var templateCache = require('gulp-angular-templatecache') // HTML templates transformation
var plugins = require('gulp-load-plugins')() // Load gulp plugins

var args = require('yargs')
.alias('b', 'build')
.alias('r', 'run')
.alias('p', 'release')
.default('build', false)
.default('run', false)
.default('release', false)
.argv

// emulate or run would also mean build
var build = args.build
var run = args.run
var release = args.release
// if build we use 'www', otherwise '.www'
var project = {
  'dist': './www/dist',
  'target': build ? './www/dist' : './www'
}

// if we just use emulate or run without specifying platform, we assume iOS
// in this case the value returned from yargs would just be true
if (run === true) {
  run = 'android'
}

var paths = {
  'ionicjs': ['./www/lib/ionic/js/ionic.bundle.min.js'],
  'ionicfonts': ['./www/lib/ionic/fonts/**'],
  'ionicstyle': ['./www/lib/ionic/css/**'],
  'sass': ['./scss/*.scss', './scss/**/*.scss'],
  'jsapp': ['./www/js/**/*.js', '!./www/js/vendor/**/*.js', '!./www/lib/ngCordova/dist/ng-cordova.min.js'],
  'assets': ['./www/assets/**'],
  'tpl': ['./www/js/**/*.html'],
  'useref': ['./www/index.html']
}

gulp.task('default', ['compilation'])

// no-op = empty function
gulp.task('noop', function () {})

// clean repository
gulp.task('clean', function (done) {
  return del([project.dist + '/**']).then(paths => {
    gulp.on('end', done)
  })
})

gulp.task('reload:css', ['scss'], function () {
  gulp.src(paths.css)
    .pipe(plugins.connect.reload())
})

gulp.task('reload:js', ['js'], function () {
  gulp.src(paths.jsapp)
    .pipe(plugins.connect.reload())
})

gulp.task('reload:html', ['html'], function () {
  gulp.src(paths.tpl)
    .pipe(plugins.connect.reload())
})

gulp.task('watch', ['useref'], function () {
  gulp.watch(paths.sass, ['reload:css'])
  gulp.watch(paths.jsapp, ['reload:js'])
  gulp.watch(paths.assets, ['assets'])
  gulp.watch(paths.tpl, ['reload:html'])
  gulp.watch(paths.useref, ['useref'])
})

gulp.task('connect', [], function () {
  plugins.connect.server({
    root: project.target,
    livereload: true
  })
})

gulp.task('useref', ['scss', 'js', 'html', 'assets', 'ionicdeps', 'db'], function (done) {
  gulp.src(paths.useref)
    .pipe(plugins.plumber())
    .pipe(plugins.useref())
    .pipe(gulp.dest(project.dist))
    .on('end', done)
})

gulp.task('scss', function (done) {
  gulp.src(paths.sass)
    .pipe(plugins.plumber())
    .pipe(plugins.sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCSS())
    .pipe(plugins.rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done)
})

gulp.task('js', function (done) {
  gulp.src(paths.jsapp)
    .pipe(plugins.plumber())
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.ngAnnotate({single_quotes: true}))
    .pipe(gulp.dest(project.dist + '/dist_js/app'))
    .on('end', done)
})

gulp.task('ionicdeps', function (done) {
  gulp.src(paths.ionicfonts)
    .pipe(gulp.dest('./www/dist/lib/ionic/fonts'))
  gulp.src(paths.ionicstyle)
    .pipe(gulp.dest('./www/dist/lib/ionic/css')).on('end', done)
})

gulp.task('assets', function (done) {
  gulp.src(paths.assets)
    .pipe(gulp.dest('./www/dist/assets'))
    .on('end', done)
})

gulp.task('db', function (done) {
  gulp.src('./www/**.sqlite')
    .pipe(gulp.dest('./www/dist/'))
    .on('end', done)
})

gulp.task('html', function (done) {
  gulp.src(paths.tpl)
    .pipe(plugins.plumber())
    .pipe(plugins.htmlhint({
      'doctype-first': false
    }))
    .pipe(plugins.htmlhint.reporter())
    .pipe(templateCache({'standalone': true}))
    .pipe(gulp.dest('./www/dist/dist_js/app'))
    .on('end', done)
})

// Tache principale
gulp.task('compilation', function (done) {
  runSequence(
    'clean',
    run ? 'useref' : 'watch',
    run ? 'noop' : 'connect',
    run ? (release ? 'ionic:release' : 'ionic:debug') : 'noop',
  done)
})

  // ionic run wrapper
gulp.task('ionic:release', plugins.shell.task([ 'ionic run ' + run + ' --release' ]))

gulp.task('ionic:debug', plugins.shell.task([ 'ionic run ' + run ]))
