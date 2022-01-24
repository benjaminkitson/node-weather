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
const searchInfo = document.querySelector('.search-info')


searchButton.addEventListener('mouseup', (e) => {
  e.preventDefault()
  if (!Array.from(searchButton.classList).includes('active')) {
    searchContainer.classList.add('expanded')
    searchButton.classList.add('active')
  } else {
    searchInfo.innerHTML = "Getting weather info!"
    const url = `/weather?location=${search.value}`
    fetchWeather(url, (weather) => {
      console.log(weather)
      if (typeof weather === 'string') {
        searchInfo.innerHTML = weather
        weatherItems.forEach((weatherItem, i) => {
        weatherItem.innerHTML = ''
        })
      } else {
        searchInfo.innerHTML = ''
        weatherItems.forEach((weatherItem, i) => {
        weatherItem.innerHTML = Object.values(weather.response)[i]
        })
      }
    })
  }
})

searchButton.addEventListener('mousedown', (e) => {
  e.preventDefault()
  searchField.focus()
})

searchField.addEventListener('blur', (e) => {
  e.preventDefault()
  if (!searchField.value) {
    searchContainer.classList.remove('expanded')
    searchButton.classList.remove('active')
  }
})
