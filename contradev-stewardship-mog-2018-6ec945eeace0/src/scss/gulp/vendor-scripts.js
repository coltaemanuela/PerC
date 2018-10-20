module.exports = function (gulp, plugins) {
    return function () {
        gulp.src('./src/scss/js/vendors/*.js')
	        .pipe(plugins.concat('vendors.js'))
			.pipe(gulp.dest('./src/assets/toolkit/scripts/'))
			.pipe(plugins.rename({ basename: 'vendors', suffix: '.min' }))
			.pipe(plugins.uglify())
			.pipe(gulp.dest('./src/assets/toolkit/scripts/'));
		gulp.src('./src/scss/js/static/*.js')
			.pipe(gulp.dest('./src/assets/toolkit/scripts/'));
    };
};
