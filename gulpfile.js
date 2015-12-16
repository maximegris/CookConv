var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint'); // Lint your javascript
var stylish = require('jshint-stylish'); // Lint your javascript
var templateCache = require('gulp-angular-templatecache'); //HTML templates transformation
var ngAnnotate = require('gulp-ng-annotate'); // Enable ng-strict-di (injection)
var useref = require('gulp-useref'); // Concatenate js and css files
var connect = require('gulp-connect'); // Run a webserver (with Livereload)

var args = require('yargs')
.alias('b', 'build')
.alias('r', 'run')
.default('build', false)
.argv;

// emulate or run would also mean build
var build = args.build;
var run = args.run;
// if build we use 'www', otherwise '.tmp'
var targetDir = build ? './www/dist' : './www';

// if we just use emualate or run without specifying platform, we assume iOS
// in this case the value returned from yargs would just be true
if (run === true) {
  run = 'android';
}

var paths = {
  sass: ['./scss/*.scss', './scss/**/*.scss'],
  js : ['./www/js/**/*.js'],
  jsapp : ['./www/js/**/*.js', '!./www/js/vendor/**/*.js', '!./www/js/ng-cordova.min.js'],
  tpl : ['./www/templates/**/*.html'],
  useref: ['./www/*.html']
};

gulp.task('default', ['build']);

// no-op = empty function
gulp.task('noop', function() {});

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
    .pipe(clean({force: true}));
  });

  gulp.task('ng_annotate', function (done) {
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

  gulp.task('watch', [],  function() {
  gulp.watch(paths.sass, ['useref']);
  gulp.watch(paths.js, ['useref']);
  gulp.watch(paths.tpl, ['useref']);
  gulp.watch(paths.useref, ['useref']);
});

  gulp.task('connect', [], function() {
  connect.server({
    root: targetDir,
    livereload: true
  });
});

  gulp.task('build', function (done) {
  runSequence(
    'clean',
    'useref',
    run ? 'noop' : 'watch',
    run ? 'noop' : 'connect',
    run ? 'ionic:run' : 'noop',
    done);
  });

  // ionic run wrapper
  gulp.task('ionic:run', shell.task([
    'ionic run ' + run
  ]));

gulp.task('install', function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});
