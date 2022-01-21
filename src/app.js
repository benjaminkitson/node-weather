const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))


app.use(express.static(
  path.join(__dirname, "../public")
))

app.get('', (req, res) => {
  res.render('index.hbs', {
    title: "Home"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About"
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    text: "Here is some random meaningless text."
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address"
    })
  }

  res.send({
    address: req.query.address,
    forecast: "Rain lol"
  })

})

app.get('/products', (req,res) => {
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    message: "No help topic here!"
  })
})


app.get('*', (req, res) => {
  res.render('404', {
    message: "Just a general fail really"
  })
})

app.listen(3000, () => {
  console.log("Server started!")
})
