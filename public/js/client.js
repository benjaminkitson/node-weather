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

const searchField = document.querySelector('.search-field')
const searchButton = document.querySelector('.search-button')
const searchContainer = document.querySelector('.search-field-container')
const search = document.querySelector('input')
const weatherItems = Array.from(document.querySelectorAll('.weather-item'))


searchButton.addEventListener('mouseup', (e) => {
  e.preventDefault()
  if (!Array.from(searchButton.classList).includes('active')) {
    searchContainer.classList.add('expanded')
    searchButton.classList.add('active')
    searchField.focus()
  } else {
    const url = `http://localhost:3000/weather?location=${search.value}`
    fetchWeather(url, (weather) => {
      console.log(weather)
      if (typeof weather === 'string') {
        weatherItems[0].innerHTML = weather
      } else {
        weatherItems.forEach((weatherItem, i) => {
        weatherItem.innerHTML = Object.values(weather.response)[i]
        })
      }
    })
  }
})

searchField.addEventListener('blur', () => {
  if (!searchField.value) {
    searchContainer.classList.remove('expanded')
    searchButton.classList.remove('active')
  }
})
