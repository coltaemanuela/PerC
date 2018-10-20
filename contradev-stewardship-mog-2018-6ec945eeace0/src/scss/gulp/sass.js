const moduleImporter = require('sass-module-importer');
const path = require('path');

module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('./src/scss/scss/**/*.scss')
			.pipe(plugins.sass({ importer: moduleImporter({ basedir: path.join(__dirname, '../../../') }), errLogToConsole: true, outputStyle: 'expanded', precision: 10 }))
			.pipe(plugins.rucksack())
			.pipe(plugins.autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(plugins.plumber.stop())
			.pipe(gulp.dest('./src/assets/toolkit/styles/'))
			.pipe(plugins.filter('**/*.css'))
			.pipe(plugins.rename({ suffix: '.min' }))
			.pipe(plugins.uglifycss({
				maxLineLen: 80
			}))
			.pipe(gulp.dest('./src/assets/toolkit/styles/'));


    };
};
