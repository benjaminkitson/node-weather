const request = require('postman-request');
const chalk = require('chalk');

const secret = require('../secret.js');
const geocode = secret.GEOCODE

// import geocode variable

function geocodeFunction(address, callback) {
  const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${geocode}`
  request({ json: true, url: locationURL }, (error, response) => {
    if (error) {
      callback("Request failed.", undefined)
    } else if (response.body.features.length === 0) {
      callback("Unable to determine location.", undefined)
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0]
      })
    }
  })
}

geocodeFunction("london", function(error, response) {
  console.log(error ? error : response)
})

module.exports = geocodeFunction
