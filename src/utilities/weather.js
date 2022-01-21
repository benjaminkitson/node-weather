const request = require('postman-request');
const secret = require('./secret.js');
const weather = secret.WEATHER

function getWeather({latitude, longitude}, callback) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather}`
  request({json:true, url: weatherURL}, function(error, {body: weatherData}) {
    if (error) {
      callback("Request failed.", undefined)
    } else if (weatherData.error) {
      console.log(weatherData.error)
      callback("Unknown location.", undefined)
    } else {
      const {temp, feels_like:feelsLike} = weatherData.current;
      callback(undefined, {
        temp,
        feelsLike
      })
    }
  })
}


module.exports = getWeather;
