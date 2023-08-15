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

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});
const port = 5000;
const server = app.listen(port, listening);

const listening = function(statuscode) {
  console.log(`Running on localhost: ${port}`);
  return statuscode
}


// API keys
const geonamesAPIKey = 'hehejow';
const weatherbitAPIKey = '9289c051d6824abab7e4f9fbcb13eb19';
const pixabayAPIKey = '38841595-d92bba095e89d22c8c5c8818f';

// Server-side endpoint to handle API request
app.post('/weather', (req, res) => {
  const city = req.body.city;
  const tripDate = req.body.tripDate;
  const remainingDays = req.body.remainingDays;

  const geonamesURL = `http://api.geonames.org/searchJSON?q=${city}&username=${geonamesAPIKey}`;
  const weatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat={latitude}&lon={longitude}&key=${weatherbitAPIKey}`;
  const pixabayURL = `https://pixabay.com/api/?key=${pixabayAPIKey}&q=${encodeURIComponent(city)}`;

  // Fetch location data from Geonames API
  fetch(geonamesURL)
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
      projectData.tripDate = tripDate;
      projectData.remainingDays = remainingDays;

      // Fetch weather data and image data concurrently using Promise.all()
      Promise.all([
        fetchWeatherData(locationData.latitude, locationData.longitude),
        fetchImageData()
      ])
        .then(() => {
          // Send a response back to the client
          res.status(200).json(projectData);
          console.log('Data sent to client:', projectData);
        })
        .catch(error => {
          console.log('Error:', error);
          res.status(500).json({
            error: 'Failed to fetch data'
          });
        });
    })
    .catch(error => {
      console.log('Error:', error);
      res.status(500).json({
        error: 'Failed to fetch location data'
      });
    });

  // Callback function for weather API call
  const fetchWeatherData = (latitude, longitude) => {
    const url = weatherbitURL.replace('{latitude}', latitude).replace('{longitude}', longitude);

    // Fetching the data from Weatherbit API
    return fetch(url)
      .then(response => response.json())
      .then(weatherData => {
        // Extracting the weather data for each day
        const forecastData = weatherData.data.map(day => ({
          temperature: day.temp,
          date: day.datetime,
          weather: day.weather.description
        }));

        // Add the forecast data to the projectData object
        projectData.forecast = forecastData;
      });
  };

  // Callback function for Pixabay API call
  const fetchImageData = () => {
    // Fetching the data from Pixabay API
    return fetch(pixabayURL)
      .then(response => response.json())
      .then(imageData => {
        // Check if there are any image results
        if (imageData.hits.length > 0) {
          // Extract the image URL from the response
          const imageURL = imageData.hits[0].webformatURL;

          // Add the image URL to the projectData object
          projectData.imageURL = imageURL;
        } else {
          // If there are no image results, set a default image URL
          projectData.imageURL = 'https://via.placeholder.com/500';
        }
      });
  };
});

app.get('/projectData', (req, res) => {
  res.send(projectData);
});
module.exports = {listening};