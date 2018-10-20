const qs = require('qs');
const axios = require('axios');
const config = require('../config.json');
const notifier = require('node-notifier');

module.exports = (amount) => {
    notifier.notify({
        title: 'Your PerC donation is ready',
        message: 'Your suggested donation is ready to be confirmed'
    });
};