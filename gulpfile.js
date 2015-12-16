var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var jshint = require('gulp-jshint'); // Lint your javascript
var stylish = require('jshint-stylish'); // Lint your javascript
var templateCache = require('gulp-angular-templatecache'); //HTML templates transformation
var ngAnnotate = require('gulp-ng-annotate'); // Enable ng-strict-di (injection)
var useref = require('gulp-useref'); // Concatenate js and css files

var paths = {
  sass: ['./scss/ionic.app.scss'],
  js : ['./www/js/**/*.js'],
  jsapp : ['./www/js/**/*.js', '!./www/js/vendor/**/*.js', '!./www/js/ng-cordova.min.js'],
  tpl : ['./www/templates/**/*.html'],
  useref: ['./www/*.html']
};

gulp.task('default', ['useref']);

gulp.task('sass', function(done) {
  gulp.src(paths.sass)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('lint', function() {
  return gulp.src(paths.jsapp)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('templatecache', function (done) {
    gulp.src(paths.tpl)
      .pipe(templateCache({standalone:true}))
      .pipe(gulp.dest('./www/js'))
      .on('end', done);
  });

  gulp.task('clean', function (done) {
    return gulp.src('./www/dist', {read: false})
    .pipe(clean());
  });

  gulp.task('ng_annotate', [ 'clean' ], function (done) {
   gulp.src(paths.js)
     .pipe(ngAnnotate({single_quotes: true}))
     .pipe(gulp.dest('./www/dist/dist_js/app'))
     .on('end', done);
 });

 gulp.task('useref', ['sass', 'lint', 'templatecache', 'ng_annotate'], function (done) {
    var assets = useref.assets();
    gulp.src(paths.useref)
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('./www/dist'))
      .on('end', done);
  });

gulp.task('watch', ['useref'],  function() {
  gulp.watch(paths.sass, ['useref']);
  gulp.watch(paths.js, ['useref']);
  gulp.watch(paths.tpl, ['useref']);
  gulp.watch(paths.useref, ['useref']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
