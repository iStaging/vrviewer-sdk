const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('examples/static'))
app.use('/dist', express.static('dist'))

app.get('/', function (req, res) {
  const url = `/en/index.html`
  res.redirect(url)
})

app.listen(process.env.PORT || 3001, function () {
  console.log('Example app listening on port 3001!')
})
