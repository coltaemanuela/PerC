module.exports = function (gulp, plugins) {
	return function () {
		gulp.src('./src/scss/sketch/masters.sketch')
			.pipe(plugins.sketch({ export: 'artboards', formats: 'png' }))
		    .pipe(gulp.dest('./src/scssimg/'));
	};
};
