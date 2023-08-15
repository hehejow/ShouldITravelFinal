const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));
let projectData = {};

app.get('/', function(req, res) {
    res.sendFile('dist/index.html');
});
const port = 5000;
const server = app.listen(port, listening);

function listening() {
    console.log('Server running');
    console.log(`Running on localhost: ${port}`);
}

// Server-side endpoint to handle API request
app.post('/weather', (req, res) => {
  const city = req.body.zipCode;
  const tripDate = req.body.tripDate; // Access the tripDate value from the request body
  const remainingDays = req.body.remainingDays; // Access the remainingDays value from the request body
  const username = 'hehejow';
  const baseURL = 'http://api.geonames.org/searchJSON';

  // String concatenation for API endpoint
  const url = `${baseURL}?q=${city}&username=${username}`;

  // Fetching the data from Geonames API
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Extracting the location data from the response
          const locationData = {
              city: data.geonames[0].name,
              country: data.geonames[0].countryName,
              latitude: data.geonames[0].lat,
              longitude: data.geonames[0].lng
          };

          // Add the location data to the projectData object
          projectData = locationData;
          projectData.tripDate = tripDate; // Add tripDate to projectData
          projectData.remainingDays = remainingDays

          // Send a response back to the client
          res.status(200).json(locationData);
          console.log('Location data sent to client:', locationData);
      })
      .catch(error => {
          console.log('Error:', error);
          res.status(500).json({
              error: 'Failed to fetch location data'
          });
      });
});

app.get('/projectData', function(req, res) {
    res.send(projectData);
});