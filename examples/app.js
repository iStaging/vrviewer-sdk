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

// Check the api examples in routes folder.
// var panorama = require('./routes/panorama')
// app.use('/api/v1/panorama', panorama)

app.get('/', function (req, res) {
  res.sendfile('examples/index.html')
})

// fetchPanoCollection
app.get('/api/v1/panoCollection', function (req, res) {
 const panoCollection = [{
    "ID": "01",
    "Name": "panoCollection01" ,
    "OwnerID": "tenant_01"
  }]
  res.status(HTTPStatus.OK).json(panoCollection)
})

// createPanoCollection
app.post('/api/v1/panoCollection', function (req, res) {
  const panoCollection = req.body
  res.status(HTTPStatus.OK).json(panoCollection)
})

// fetchPanoramas
app.get('/api/v1/panorama', function (req, res) {
  const panoramas = [{
    'Name': 'name01',
    'DownloadUrl': 'https://storage.googleapis.com/vr-cam-161603.appspot.com/0b76c6f2-7f66-4454-9fb3-3e05bf98f7e7/0013be6e-c70c-42f1-8ccd-7f51b7b82204/panoramas/4f26b89d-4383-4723-be9d-d12fd2c2cef0.jpg',
    'ID': '0f62e098-b8aa-4a4a-a635-f2243788471f',
    'panoramaIndex': 0,
    'cubemapReady': true,
    'cubemapLinks': [
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg'
    ],
    // not ready props
    'panoramaName': 'others',
    'createdAt': 1522136180000,
    'updatedAt': 1522136180000
  }, {
    'Name': 'name02',
    'DownloadUrl': 'https://storage.googleapis.com/vr-cam-161603.appspot.com/b6a1ba85-cb52-4abb-be50-419f9c329d6b/8ffa7a7f-4d90-41c0-b9c3-7b995d213109/panoramas/00b27bcb-0143-435d-8180-37d1766f5671.jpg',
    'ID': '782949e8-c37a-4171-a004-54c76937135c',
    'panoramaIndex': 1,
    'cubemapReady': true,
    'cubemapLinks': [
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_782949e8-c37a-4171-a004-54c76937135c.jpg',
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_782949e8-c37a-4171-a004-54c76937135c.jpg'
    ],
    // not ready props
    'panoramaName': 'others',
    'updatedAt': 1522136180000,
    'createdAt': 1522136180000
  }]
  res.status(HTTPStatus.OK).json(panoramas)
})

// createPanoramas
app.post('/api/v1/panorama', function (req, res) {
  const panoramas = req.body
  res.status(HTTPStatus.OK).json(panoramas)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
