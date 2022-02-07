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

const searchField = document.querySelector('.search-field');
const searchButton = document.querySelector('.search-button');
const searchContainer = document.querySelector('.search-field-container');
const search = document.querySelector('input');
const weatherData = Array.from(document.querySelectorAll('.weather-datum'));
const weatherDescription = document.querySelector('.weather-description')
const icon = document.querySelector('.weather-icon')
const header = document.querySelector('.header');
const heading = document.querySelector('.heading');
const locationDiv = document.querySelector('.location')
let folded = false

window.addEventListener('scroll', (e) => {
  e.preventDefault()
})

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

function setIcon(link) {
  const iconPromise = new Promise((resolve, reject) => {
    console.log('hello')
    const iconImage = new Image(128, 128);
    iconImage.src = `/images/${link}.png`;
    resolve(icon.appendChild(iconImage));
    reject('Operation failed.')
  })

  return iconPromise
}

searchButton.addEventListener('mouseup', (e) => {

  e.preventDefault();;
  if (!Array.from(searchButton.classList).includes('active')) {
    searchContainer.classList.add('expanded');
    searchButton.classList.add('active');
  } else {
    fold()
    locationDiv.innerHTML = `"${search.value}"`
    const url = `/weather?location=${search.value}`
    fetchWeather(url, (weather) => {
      console.log(weather);
      if (typeof weather === 'string') {
        // searchInfo.innerHTML = weather
        weatherData.forEach((weatherDatum, i) => {
          weatherDatum.innerHTML = ''
        });
      } else {
        // searchInfo.innerHTML = ''
        setIcon(weather.response.topSection.icon)
        .then((result) => {
          weatherDescription.innerHTML = weather.response.topSection.weather;
          weatherData.forEach((weatherDatum, i) => {
            weatherDatum.innerHTML = Object.values(weather.response.bottomSection)[i]
          });
        }).catch((error) => {
          console.log(error)
        });
        // icon.src = `/images/${weather.response.topSection.icon}.png`

      }
    });
  }
});

window.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (e.keyCode === 13 && document.activeElement === searchField) {
    fold()
    // searchInfo.innerHTML = "Getting weather info!"
    const url = `/weather?location=${search.value}`
    locationDiv.innerHTML = `"${search.value}"`
    fetchWeather(url, (weather) => {
      console.log(weather);
      if (typeof weather === 'string') {
        // searchInfo.innerHTML = weather
        weatherData.forEach((weatherDatum, i) => {
          weatherDatum.innerHTML = ''
        });
      } else {
        // searchInfo.innerHTML = ''
        icon.src = `/images/${weather.response.topSection.icon}.png`
        weatherDescription.innerHTML = weather.response.topSection.weather;
        weatherData.forEach((weatherDatum, i) => {
          weatherDatum.innerHTML = Object.values(weather.response.bottomSection)[i]
        });
      }
    });
  }
});

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
