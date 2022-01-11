const request = require('postman-request');
const chalk = require('chalk');
const secret = require('./secret.js');
const geocodeFunction = require('./utils/geocode.js')
const weatherFunction = require('./utils/geocode.js')



//mapbox

//// location request ////

// function getWeather() {

//   request({ json: true, url: weatherURL }, function (error, response) {

//     if (error) {
//       console.log(chalk.red("Weather request failed"))
//       return
//     }

//     const data = response.body;
//     const temp = data.current.temp;
//     const feelsLike = data.current.feels_like;
//     console.log(`It's ${chalk.blue(temp + "C")} outside, but it feels like ${chalk.blue(feelsLike + "C")}.`)
//   })

// }


// request({ json: true, url: locationURL }, function (error, response) {

//   if (error) {
//     console.log(chalk.red("Location request failed"))
//     return
//   }

//   const data = response.body;

//   if (data.features.length === 0) {
//     console.log(chalk.red("Invalid request"))
//     return
//   }

//   const coords = data.features[0].center.map((coord => coord.toFixed(4)));
//   [longitude, latitude] = coords
//   console.log(chalk.green("Success!"))
//   console.log(`Search query: ${process.argv[2]}`)
//   console.log(`Latitude: ${chalk.green(coords[1])}; Longitude: ${chalk.green(coords[0])}`)
//   weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${weather}`
//   //// weather request ////

//   getWeather()
// })



geocodeFunction(process.argv[2], (error, data) => {

})
