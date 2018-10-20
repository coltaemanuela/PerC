module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('./src/scss/js/*.js')
			.pipe(plugins.jshint())
			.pipe(plugins.jscs())
			.pipe(plugins.jscsStylish.combineWithHintResults())
            .pipe(plugins.jshint.reporter('jshint-stylish', { beep: true }))
            .pipe(plugins.concat('custom.js'))
			.pipe(gulp.dest('./src/assets/toolkit/scripts/'))
			.pipe(plugins.rename({ basename: 'custom', suffix: '.min' }))
			.pipe(plugins.uglify())
			.pipe(gulp.dest('./src/assets/toolkit/scripts/'));
    };
};
