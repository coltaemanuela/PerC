const qs = require('qs');
const axios = require('axios');
const config = require('../config.json');

module.exports = (req, res, next) => {
  axios.get('https://api.monzo.com/transactions', {
    headers: {
      Authorization: `Bearer ${config.apiKey}`
    },
    params: {
      account_id: config.accountId
    }
  }).then(response => {
    const oneWeekAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    console.log(oneWeekAgo);
    const cleanList = response.data.transactions
      .filter(t => {
        return (Date.parse(t.settled) > oneWeekAgo)
      })
      .map(t => {
        return {
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
  });
}
