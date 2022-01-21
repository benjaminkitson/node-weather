function fetchWeather(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.log(data.error)
      } else {
        console.log(data)
      }
    });
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const url = `http://localhost:3000/weather?location=${search.value}`
  fetchWeather(url)
})
