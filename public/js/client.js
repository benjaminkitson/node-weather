// document.querySelector chaos - relatively self explanatory, but should maybe spread out

const searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-button');
const searchContainer = document.querySelector('.search-field-container');
const search = document.querySelector('input');
const weatherData = Array.from(document.querySelectorAll('.weather-datum'));
const weatherDescription = document.querySelector('.weather-description')
const icon = document.querySelector('.weather-icon')
const header = document.querySelector('.header');
const heading = document.querySelector('.heading');
const locationDiv = document.querySelector('.search-query')
const HTML = document.querySelector('html')
const temperature = document.querySelector('.temperature')
const sunset = document.querySelector('.sunset')
const sunrise = document.querySelector('.sunrise')
const windSpeed = document.querySelector('.wind-speed')
const windDirection = document.querySelector('.wind-direction')

let folded = false


// Function using callback syntax to specify what to do after the weather data is fetched

function fetchWeather(url, func) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        func(data.error);
      } else {
        func(data);
      }
    });
}



// Collapses the header down to the top of the page on first search

function fold() {
  searchField.blur();
  if (folded === false && searchField.value != '') {
    heading.addEventListener('transitionend', (e) => {
      if (e.propertyName = 'opacity') {
        heading.style.height = "0";
      } else {
        heading.style.display = "none";
      }
    })
    header.style.height = '80px'
    heading.style.opacity = '0'
  }
  folded = true
}



// Formats the sunrise and sunset times into 24H without seconds

function timeFormat(time) {
  let isPM = false;
  if (time[time.length-2] === "P") isPM = true;
  const splitTime = time.split(":");
  splitTime[0] = (isPM ? parseInt(splitTime[0]) + 12 : parseInt(splitTime[0])).toString();
  splitTime[0] = (splitTime[0].length === 1 ? `0${splitTime[0]}` : splitTime[0])
  const newTime = [splitTime[0], splitTime[1]].join(":");
  return newTime
}



// Converts tempaerature to Fahrenheit

function fahrenheit(celsius) {
  return (celsius * (9/5) + 32)
}



// Carries out the various fetchWeather operations needed to retrieve the data and insert it (this can be broken down further)

function insertWeather() {
  const url = `/weather?location=${search.value}`
  fetchWeather(url, (weather) => {
    console.log(weather);
    if (typeof weather === 'string') {
      // searchInfo.innerHTML = weather
      weatherData.forEach((weatherDatum, i) => {
        weatherDatum.innerHTML = ''
      });
    } else {
      console.log(weather.response.topSection.icon)
      // searchInfo.innerHTML = ''
      fetch(`/images/${weather.response.topSection.icon}.png`)
        .then((response) => response.blob())
        .then((imageBlob) => {
          const iconPromise = new Promise((resolve, reject) => {
            const iconURL = URL.createObjectURL(imageBlob)
            resolve(iconURL)
            reject("Image load failed")
          })
          return iconPromise
        })
        .then((result) => {
          locationDiv.innerHTML = weather.response.topSection.place
          icon.src = result;
          weatherDescription.innerHTML = weather.response.topSection.weather;
          const weatherDetails = weather.response.bottomSection;
          const celsius = Math.round(weatherDetails.temp);
          temperature.innerHTML = `${celsius}°C / ${Math.round(fahrenheit(celsius))}°F`;
          sunrise.innerHTML = timeFormat(weatherDetails.sunrise);
          sunset.innerHTML = timeFormat(weatherDetails.sunset);
          windSpeed.innerHTML = `${weatherDetails.windSpeed}m/s`;
          windDirection.firstElementChild.style.transform = `rotate(${weatherDetails.windDeg}deg)`
          // weatherData.forEach((weatherDatum, i) => {
          //   weatherDatum.innerHTML = Object.values(weather.response.bottomSection)[i]
          // });

          if (weather.response.topSection.icon[weather.response.topSection.icon.length - 1] === "n") {
            HTML.classList.add('n-clear');
          } else if (weather.response.topSection.icon[weather.response.topSection.icon.length - 1] === "d") {
            HTML.classList.remove('n-clear');
          }
        }).catch((error) => {
          console.log(error);
        });
      // icon.src = `/images/${weather.response.topSection.icon}.png`

    }
  });
}


// Event listeners for searching the weather using enter key and button click

searchButton.addEventListener('mouseup', (e) => {

  e.preventDefault();;
  if (!Array.from(searchButton.classList).includes('active')) {
    searchContainer.classList.add('expanded');
    searchButton.classList.add('active');
  } else {
    fold()
    insertWeather()
  }
});

window.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13 && document.activeElement === searchField) {
    fold()
    insertWeather()
  }
});



//Event listeners for the variou search bar animations

searchButton.addEventListener('mousedown', (e) => {
  e.preventDefault();
  window.scroll(0,0);
  searchField.focus();
})

searchField.addEventListener('focus', (e) => {
  e.preventDefault();
})

searchField.addEventListener('blur', (e) => {
  e.preventDefault();
  window.scroll(0, 0);
  searchContainer.classList.remove('expanded')
  searchButton.classList.remove('active')
})
