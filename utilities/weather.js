const request = require('postman-request');
const chalk = require('chalk');

const secret = require('../secret.js');
const weather = secret.WEATHER

function weatherFunction(coords, callback) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=metric&appid=${weather}`
  request({json:true, url: weatherURL}, function(error, response) {
    if (error) {
      callback("Weather request failed", undefined)
    } else {
      const data = response.body;
      callback(undefined, {
        temp: data.current.temp,
        feelsLike: data.current.feels_like
      })
    }
  })
}

weatherFunction([51,0], function(error, response) {
  console.log(error ? error : response)
})

module.exports = weatherFunction;
