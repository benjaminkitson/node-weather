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

const searchButton = document.querySelector('.search-button')
const searchContainer = document.querySelector('.search-field-container')
const search = document.querySelector('input')
const weatherItems = Array.from(document.querySelectorAll('.weather-item'))


searchButton.addEventListener('mouseup', (e) => {
  e.preventDefault()
  searchContainer.classList.add('expanded')
  // const url = `http://localhost:3000/weather?location=${search.value}`
  // fetchWeather(url, (weather) => {
  //   weatherItems.forEach((weatherItem, i) => {
  //     weatherItem.innerHTML = Object.values(weather.response)[i]
  //   })
  // })
})
