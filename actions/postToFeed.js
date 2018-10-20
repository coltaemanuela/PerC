const qs = require('qs');
const axios = require('axios');
const config = require('../config.json');

 module.exports = (req, res, next) => {
  const body = {
  	"account_id": config.accountId,
  	"type": "basic",
  	"url": "http://www.nyan.cat/",
  	"params": {
  		"title": "Your stewardship transaction is complete",
  		"body": `You have donated £${req.params.amount}`,
  		"image_url": "https://www.stewardship.org.uk/favicon.ico"
    }
  };

  const params = {
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  };

  axios.post('https://api.monzo.com/feed', qs.stringify(body), params)
    .then(response => {
      res.sendStatus(200);
      next();
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(500);
      next();
    });
};
