const qs = require('qs');
const axios = require('axios');
const config = require('../config.json');
const NotificationCenter = require('node-notifier').NotificationCenter;

var notifier = new NotificationCenter({
  withFallback: false, // Use Growl Fallback if <= 10.8
  customPath: void 0 // Relative/Absolute path to binary if you want to use your own fork of terminal-notifier
});

module.exports = (amount) => {
    notifier.notify({
        title: 'Your PerC donation is ready',
        message: 'Your suggested donation is ready to be confirmed',
        open: "http://localhost:3001/demos/008-theme061.html",
        actions: "open"
    });
};
