function fetchWeather(url, func) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        func(data.error)
      } else {
        func(data)
      }
    });

}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const weatherContainer = document.querySelector('.weather-container')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = `http://localhost:3000/weather?location=${search.value}`
  fetchWeather(url, (weather) => {
    console.log(weather.response)
    weatherContainer.innerHTML = JSON.stringify(weather.response)
  })
})
