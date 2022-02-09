const request = require('postman-request');
const geocode = process.env.geocode_key || 'pk.eyJ1IjoiYmVuazEzIiwiYSI6ImNreWExNWFzYjAxM24ycW84dDZoNmp1eHoifQ.y2iTi6ZWriTeUu29Dwoszg';

function getGeocode(location, callback) {
  const locationURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${geocode}`
  request({ json: true, url: locationURL }, (error, response) => {
    if (error) {
      callback("Request failed.", undefined)
    } else if (response.body.features.length === 0) {
      callback("Unable to determine location.", undefined)
    } else {
      const [longitude, latitude] = response.body.features[0].center;
      const location = response.body.features[0].place_name;
      callback(undefined, {
        latitude,
        longitude,
        location,
      })
    }
  })
}

module.exports = getGeocode
