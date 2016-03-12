var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var shell = require('gulp-shell');
var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
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
// if build we use 'www', otherwise '.www'
var project = {
	dist : './www/dist',
	target : build ? './www/dist' : './www',

};

// if we just use emulate or run without specifying platform, we assume iOS
// in this case the value returned from yargs would just be true
if (run === true) {
  run = 'android';
}

var paths = {
  ionicjs : ['./www/lib/ionic/js/ionic.bundle.min.js'],
  ionicfonts : ['./www/lib/ionic/fonts/**'],
  ionicstyle : ['./www/lib/ionic/css/**'],
  sass: ['./scss/*.scss', './scss/**/*.scss'],
  jsapp : ['./www/js/**/*.js', '!./www/js/vendor/**/*.js', '!./www/lib/ngCordova/dist/ng-cordova.min.js'],
  assets : ['./www/assets/**'],
  tpl : ['./www/templates/**/*.html'],
  useref: ['./www/*.html']
};

gulp.task('default', ['build']);

// no-op = empty function
gulp.task('noop', function() {});

gulp.task('sassFiles', function(done) {
  gulp.src(paths.sass)
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCSS())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('jsFiles', function(done) {
gulp.src(paths.jsapp)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    //.pipe(jshint.reporter('fail'))
	.pipe(ngAnnotate({single_quotes: true}))
	.pipe(gulp.dest(project.dist + '/dist_js/app'))
	.on('end', done);
});

gulp.task('ionicdeps', function(done) {
gulp.src(paths.ionicfonts)
	.pipe(gulp.dest('./www/dist/lib/ionic/fonts'));
gulp.src(paths.ionicstyle)
	.pipe(gulp.dest('./www/dist/lib/ionic/css')).on('end', done);
});

gulp.task('assets', function(done) {
gulp.src(paths.assets)
	.pipe(gulp.dest('./www/dist/assets'))
	.on('end', done);
});

gulp.task('templatecache', function (done) {
	gulp.src(paths.tpl)
	.pipe(templateCache({standalone:true}))
	.pipe(gulp.dest('./www/js'))
	.on('end', done);
});

gulp.task('clean', function (done) {
	return del([project.dist + '/**']).then(paths => {
		gulp.on('end', done);
	});
});

gulp.task('useref', ['sassFiles', 'jsFiles',  'ionicdeps', 'assets', 'templatecache'], function (done) {
	gulp.src(paths.useref)
	.pipe(useref())
	.pipe(gulp.dest(project.dist))
	.on('end', done);
});

gulp.task('watch', [],  function() {
  gulp.watch(paths.sass, ['useref']);
  gulp.watch(paths.jsapp, ['useref']);
	gulp.watch(paths.assets, ['useref']);
  gulp.watch(paths.tpl, ['useref']);
  gulp.watch(paths.useref, ['useref']);
});

gulp.task('connect', [], function() {
  connect.server({
    root: project.target,
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
