module.exports = function (gulp, plugins, url) {
    return function () {
        var files = [
			'**/*.{html,php}',
			'**/*.{png,jpg,gif}'
	    ];
	    plugins.browserSync.init(files, {
			proxy: url,
			injectChanges: true
		});
    };
};
