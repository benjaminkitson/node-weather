const request = require("postman-request")


//mapbox

const search = process.argv[2]

const location = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=pk.eyJ1IjoiYmVuazEzIiwiYSI6ImNreWExNWFzYjAxM24ycW84dDZoNmp1eHoifQ.y2iTi6ZWriTeUu29Dwoszg&limit=1`

let latitude, longitude;
let weather

//// location request ////

request({ json: true, url: location }, function (error, response) {
  const data = response.body;
  const coords = data.features[0].center.map((coord => coord.toFixed(4)));
  [longitude, latitude] = coords
  console.log(`Search query: ${process.argv[2]}`)
  console.log(`Latitude: ${coords[1]}; Longitude: ${coords[0]}`)
  weather = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=2faed7e8eafc113ae52daf1dc6e39ea2`

  //// weather request ////

  request({ json: true, url: weather }, function (error, response) {
    const data = response.body;
    const temp = data.current.temp;
    const feelsLike = data.current.feels_like;
    console.log(`It's ${temp} degrees outside, but it feels like ${feelsLike}.`)
  })
})
