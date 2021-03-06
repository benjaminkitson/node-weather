const request = require('postman-request');
const weather = process.env.weather_key || '2faed7e8eafc113ae52daf1dc6e39ea2'

function getWeather({latitude, longitude, location}, callback) {
  const place = location
  const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather}`
  request({json:true, url: weatherURL}, function(error, {body: weatherData}) {
    if (error) {
      callback("Request failed.", undefined)
    } else if (weatherData.error) {
      console.log(weatherData.error)
      callback("Unknown location.", undefined)
    } else {
      const {temp, feels_like:feelsLike, weather, sunrise, sunset, wind_speed:windSpeed, wind_deg:windDeg} = weatherData.current;
      const {daily, hourly, minutely} = weatherData;
      const formattedWeather = weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1);
      callback(undefined, {
        topSection: {
          place,
          icon: weather[0].icon,
          weather: formattedWeather
        },
        bottomSection: {
          temp,
          sunrise: new Date(sunrise * 1000).toLocaleTimeString(),
          sunset: new Date(sunset * 1000).toLocaleTimeString(),
          windSpeed,
          windDeg,
        },
        forecasts: {
          daily,
          hourly,
          minutely
        }
      })
    }
  })
}


module.exports = getWeather;
