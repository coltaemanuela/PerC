const express = require('express');
const axios = require('axios');
const config = require('./config.json');
const postToFeed = require('./actions/postToFeed');
const calculatePledge = require('./actions/calculatePledge')
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
 * Current version is just for testing purposes. 
 * The query param needs to be replaced with the id sent by POST or, better, take the date now - 7 and run a cron job ??
*/
app.get('/api/weekly-expenses/:date', (req, res, next) => {
  axios.get('https://api.monzo.com/transactions', {
        headers: {
          Authorization: `Bearer ${config.apiKey}`
        },
        params: {
          account_id: config.accountId,
          since: ""+ req.params.date+"" 
        }
      }).then(response => {
        const cleanList = response.data.transactions;
        const donation = cleanList.map(t => {
            return Math.abs(t.amount)*0.1;            
        });
        res.send(JSON.stringify(donation));         
    });
});
app.get('/pledge', calculatePledge);

app.get('/give/:amount', postToFeed);

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
