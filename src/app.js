const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');
const getWeather = require('./utilities/weather.js')
const getGeocode = require('./utilities/geocode.js')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.use(express.static(
  path.join(__dirname, "../public")
))

app.get('', (req, res) => {
  res.render('index.hbs', {
    title: "Weather!"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide a location"
    })
  }

  getGeocode(req.query.location, (error, response = {}) => {
    if (error) {
      return res.send({error})
    }

    getWeather(response, (error, response) => {
      if (error) {
        return res.send({error})
      }

      res.send({
        response
      })
    })
  })

})

app.get('*', (req, res) => {
  res.render('404', {
    message: "Just a general fail really"
  })
})

app.listen(PORT, () => {
  console.log("Server started!")
})
