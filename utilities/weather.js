const request = require('postman-request');
const secret = require('../secret.js');
const weather = secret.WEATHER

function weatherFunction(coords, callback) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=metric&appid=${weather}`
  request({json:true, url: weatherURL}, function(error, response) {
    if (error) {
      callback("Request failed.", undefined)
    } else if (response.body.error) {
      console.log(response.body.error)
      callback("Unknown location.", undefined)
    } else {
      const data = response.body;
      callback(undefined, {
        temp: data.current.temp,
        feelsLike: data.current.feels_like
      })
    }
  })
}


module.exports = weatherFunction;
