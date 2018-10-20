module.exports = function (gulp, plugins) {
	return function () {
		gulp.src('.src/scss/sketch/masters.sketch')
			.pipe(plugins.sketch({ export: 'artboards', scales: '2.0', formats: 'png' }))
		    .pipe(gulp.dest('.src/scssimg/'));
	};
};
