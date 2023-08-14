const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const apiKey = process.env.API_KEY;
const axios = require('axios');

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8040, function () {
    console.log('Example app listening on port 8040!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get('/api/analyze', async (req, res) => {
  try {
    const response = await axios.post(`https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&url=${req.query.url}&lang=en`, {
    });
    console.log('dady', response.data);
    res.send(response.data);
  } catch (error) {
    console.error('lol', error);
    res.status(500).send('Error');
  }
});