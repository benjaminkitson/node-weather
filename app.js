const request = require("postman-request")

const url = "https://api.openweathermap.org/data/2.5/onecall?lat=51.2829&lon=0.1682&units=metric&appid=2faed7e8eafc113ae52daf1dc6e39ea2"

request({ json: true, url: url}, function(error, response) {
  const data = response.body;
  const temp = data.current.temp;
  const feelsLike = data.current.feels_like;

  console.log(`It's ${temp} degrees outside, but it feels like ${feelsLike}.`)
})
