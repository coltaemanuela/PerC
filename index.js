const express = require('express');
const axios = require('axios');
const config = require('./config.json');
const postToFeed = require('./actions/postToFeed');
const calculatePledge = require('./actions/calculatePledge')
const app = express();
const port = 3000;

app.get('/pledge', calculatePledge);

app.get('/give/:amount', postToFeed);

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
