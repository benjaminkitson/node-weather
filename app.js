const chalk = require('chalk');
const geocodeFunction = require('./utilities/geocode.js');
const weatherFunction = require('./utilities/weather.js');

const location = process.argv[2]
if (!location) {
  console.log("Please provide a location.")
} else {
  geocodeFunction(location, (error, geocodeData) => {
    if (error) {
      console.log(error)
    } else {
      weatherFunction(geocodeData, (error, weatherData) => {
        console.log(location)
        console.log(error ? error : weatherData)
      })
    }
  });
}
