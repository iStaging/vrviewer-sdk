var express = require('express')
var compression = require('compression')
var history = require('connect-history-api-fallback')
var HTTPStatus = require('http-status')
// var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()

// app.use(cors())
app.use(history())

app.use(compression({filter: shouldCompress}))

// support parsing of application/json type post data
app.use(bodyParser.json())

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}

app.use(function (req, res, next) {
  var headers = req.headers
  if (headers['x-forwarded-proto'] && headers['x-forwarded-proto'] === 'http') {
    var url = 'https://' + req.headers.host + req.originalUrl
    return res.redirect(url)
  }
  next()
})

app.use(express.static('examples'))
app.use('/dist', express.static('dist'))
app.use('/examples', express.static('examples'))

app.get('/', function (req, res) {
  res.sendfile('examples/index.html')
})

app.listen(process.env.PORT || 3001, function () {
  console.log('Example app listening on port 3001!')
})
