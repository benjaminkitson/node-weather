fetch('http://localhost:3000/weather?location=tn132as')
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      console.log(data)
    }
  });

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

console.log(weatherForm)

weatherForm.addEventListener('submit', (e) =>{
  e.preventDefault()
  console.log(search.value)
})
