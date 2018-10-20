'use strict';

const drizzle = require('drizzle-builder');
const url = 'dev.stewardship';
const gulp = require('gulp');
const ghPages = require('gulp-gh-pages');
const helpers = require('@cloudfour/hbs-helpers');
const tasks = require('@cloudfour/gulp-tasks');
const env = require('gulp-util').env;
const config = require('./config');
const gulpBabel = require('gulp-babel');

const plugins = require('gulp-load-plugins')({ lazy: true, pattern: '*' });

// Append config
Object.assign(config.drizzle, { helpers });

// Register core tasks
[
  'clean',
  'copy',
  'serve',
  'watch'
].forEach(name => tasks[name](gulp, config[name]));

gulp.task('masters', require('./src/scss/gulp/masters')(gulp, plugins));
gulp.task('masters-x2', require('./src/scss/gulp/masters-x2')(gulp, plugins));
gulp.task('masters-svg', require('./src/scss/gulp/masters-svg')(gulp, plugins));
gulp.task('sass', require('./src/scss/gulp/sass')(gulp, plugins));
gulp.task('webpack', require('./src/scss/gulp/webpack')(gulp, plugins));
gulp.task('vendor-scripts', require('./src/scss/gulp/vendor-scripts')(gulp, plugins));
gulp.task('custom-scripts', require('./src/scss/gulp/custom-scripts')(gulp, plugins));
gulp.task('browser-sync', require('./src/scss/gulp/browser-sync')(gulp, plugins, url));

// Converts sketch master assets into regular and retina graphics
gulp.task('sketch', ['masters', 'masters-x2', 'masters-svg'], function () {
	return gulp.src('./src/scss/sketch/masters.sketch');
});

gulp.task('img', ['masters', 'masters-x2'], function () {
	gulp.watch('./src/scss/sketch/**/*.sketch', ['masters', 'masters-x2', 'masters-svg', plugins.browserSync.reload]);
});

// Register special CSS tasks
tasks.css(gulp, config['css:toolkit']);
tasks.css(gulp, config['css:drizzle']);
gulp.task('css', ['css:drizzle', 'css:toolkit']);

gulp.task('js:drizzle', () =>
    gulp.src('./src/assets/drizzle/scripts/drizzle.js')
        .pipe(gulpBabel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/assets/drizzle/scripts'))
);
gulp.task('js:toolkit', () =>
    gulp.src('./src/assets/toolkit/scripts/toolkit.js')
        .pipe(gulpBabel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/assets/toolkit/scripts'))
);

// Register Drizzle builder task
gulp.task('drizzle', () => {
  const result = drizzle(config.drizzle);
  return result;
});

// Register frontend composite task
gulp.task('frontend', [
  'fonts',
  'img',
  'drizzle',
  'copy',
  'css',
  'sass',
  'webpack',
  'js:drizzle',
  'js:toolkit'
]);

// Register build task (for continuous deployment via Netflify)
gulp.task('build', ['clean', 'img', 'fonts'], done => {
  gulp.start('frontend');
  done();
});

/**
 * Register demo task (deploy output to GitHub Pages)
 * NOTE: Run this after building.
 */
gulp.task('demo', () => {
  const buildDest = `${config.drizzle.dest.pages}/**/*`;
  return gulp.src(buildDest)
    .pipe(ghPages({
      cacheDir: 'demo'
    }));
});

// Register default task
gulp.task('default', ['frontend'], done => {
  gulp.start('serve');
  if (env.dev) {
    gulp.start('watch');
  }
  done();
});

gulp.task('fonts', [], function() {
  gulp.src('./src/scss/fonts/**/*')
      .pipe(gulp.dest('./dist/assets/toolkit/fonts/'));
});

gulp.task('img', [], function() {
  gulp.src('./src/scss/img/*')
      .pipe(gulp.dest('./dist/assets/toolkit/images/'));
});
