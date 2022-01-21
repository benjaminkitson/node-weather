const request = require('postman-request');
const secret = require('../secret.js');
const geocode = secret.GEOCODE

function geocodeFunction(location, callback) {
  const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${geocode}`
  request({ json: true, url: locationURL }, (error, response) => {
    if (error) {
      callback("Request failed.", undefined)
    } else if (response.body.features.length === 0) {
      callback("Unable to determine location.", undefined)
    } else {
      const [longitude, latitude] = response.body.features[0].center;
      callback(undefined, {
        latitude,
        longitude
      })
    }
  })
}

module.exports = geocodeFunction