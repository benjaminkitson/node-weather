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
const weatherItems = Array.from(document.querySelectorAll('.weather-item'))


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = `http://localhost:3000/weather?location=${search.value}`
  fetchWeather(url, (weather) => {
    weatherItems.forEach((weatherItem, i) => {
      weatherItem.innerHTML = Object.entries(weather.response)[i]
    })
  })
})
