const express = require('express');
const axios = require('axios');
var cron = require('node-cron');
const config = require('./config.json');
const postToFeed = require('./actions/postToFeed');
const calculatePledge = require('./actions/calculatePledge');
var notification = require ('./actions/notification');
const app = express();
const port = 3000;

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
app.get('/api/weekly-donation', (req,res,next) =>  {
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
    console.log('running a task every second');
    res.send(JSON.stringify(suggestedDonation));  
    next();       
  });
});

app.get('/pledge', calculatePledge);

app.get('/notification', notification);

app.get('/give/:amount', postToFeed);

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
