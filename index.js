const express = require('express');
const axios = require('axios');
var bodyParser = require('body-parser');
var cors = require('cors');
var cron = require('node-cron');
const webpush = require('web-push')
const config = require('./config.json');
const path = require('path');
const postToFeed = require('./actions/postToFeed');
const calculatePledge = require('./actions/calculatePledge');
var notification = require ('./actions/notification');
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token'); // Request headers to allow
  next();
});

app.get('/api/transactions', (req, res, next) => {
  axios.get('https://api.monzo.com/transactions', {
    headers: {
      Authorization: `Bearer ${config.apiKey}`
    },
    params: {
      account_id: config.accountId
    }
  }).then(response => {
    const cleanList = response.data.transactions
        .map(t => {
          return {
            id:t.id,
            amount: t.amount,
            date: t.created,
            category: t.category
          };
        });
    res.send(JSON.stringify(cleanList));
    next();
  }).catch(error => {
    console.log(error);
    next();
  })
});

/**
 * Identify the weekly expenses
 * Run a cron job every 7 days to identify the expenses for the last week
*/
app.get('/weekly-donation', (req,res,next) =>  {
  var before = (new Date()).toISOString();
  var since = (new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))).toISOString();
  var suggestedDonation = 0;
  axios.get('https://api.monzo.com/transactions', {
    headers: {
      Authorization: `Bearer ${config.apiKey}`
    },
    params: {
      account_id: config.accountId,
      since: since,
      before: before
    }
  }).then(response => {
    const cleanList = response.data.transactions;
    const donation = cleanList.map(t => {
      suggestedDonation += Math.abs(t.amount)*0.1;
    });
    console.log(suggestedDonation);
    res.send(JSON.stringify(suggestedDonation/100));
    next();
  });
});

app.get('/notification', function(req, res) {
  webpush.setVapidDetails(
    'mailto:alasdair.munday@gmail.com',
    config.vapidKeys.public,
    config.vapidKeys.private
  );
  webpush.sendNotification({
    "endpoint":"https://updates.push.services.mozilla.com/wpush/v1/gAAAAABbyxKS6v6Rqhm-BO3RgmLK92qTvLOuXZN1f6dw5FKYnHnndXTpihbi3Z1n65xvSLwWWRSejIVIcyr_OX8JhBL7a9NUQh-XmQ_y-8mQ3RrMYTF1x4YdQlAXJg8tNMo9nfuq-7Dc",
    "keys":{"auth":"i2L5fHKaeY6eAYFq2em36w","p256dh":"BC_4NZ81cetiv08GR5I_tJNCglSgXTiDNTMSYf0DL1EySBwmSN7zY3GPNJxRdXEmKyf0uIahHrHTrA_EMgi9lpM"}},
    'Your Push Payload Text');
  res.sendStatus(200);
});

app.get('/pledge', calculatePledge);

// app.get('/notification', notification);

app.get('/give/:amount', postToFeed);

app.get('https://updates.push.services.mozilla.com/wpush/v1/gAAAAABbyxKS6v6Rqhm-BO3RgmLK92qTvLOuXZN1f6dw5FKYnHnndXTpihbi3Z1n65xvSLwWWRSejIVIcyr_OX8JhBL7a9NUQh-XmQ_y-8mQ3RrMYTF1x4YdQlAXJg8tNMo9nfuq-7Dc')

app.use(express.static('public'))

app.use(express.static('resources'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
