const webpack = require('webpack');
const gutil = require('gutil');
const webpackConfig = require('../../../webpack.config');

module.exports = function (gulp, plugins) {
  return function () {
    webpack(webpackConfig, (err, stats) => {
      if (err) throw new gutil.PluginError('webpack', err);
      gutil.log('[webpack]', stats.toString());
    });
  };
};
