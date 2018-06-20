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
 const panoCollection = {
   'createdAt': 1526283327000,
   'description': 'aegbrew',
   'hasPin': false,
   'logoSize': 50,
   'name': 'awerg43',
   'objectId': '7e548395-f720-49c4-95ce-e31217bd5ae2',
   'requireVisitorData': false,
   'showComment': true,
   'showContactInfo': true,
   'showPoweredBy': true,
   'themeColor': 'pink',
   'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-thumbnail',
   'unavailable': false,
   'updatedAt': 1526283355000
 }
  res.status(HTTPStatus.OK).json(panoCollection)
})

// fetchPanoramas
app.get('/api/v1/panorama', function (req, res) {
  const panoramas = [{
    'adjustedRawUrl': '',
    'panoramaName': 'others',
    'createdAt': 1526283353000,
    'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/24fb9231-873d-4fbb-85f6-db2bb81b01cb.jpg',
    'cubemapReady': true,
    'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/xQa3ielE-desktop',
    'floorplanRotation': 0,
    'index': 3,
    'is720': false,
    'isTopLogo': false,
    'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/xQa3ielE-mobile',
    'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p0',
    'panoramaId': '24fb9231-873d-4fbb-85f6-db2bb81b01cb',
    'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
    'position': { 'x': 0, 'y': 0 },
    'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/24fb9231-873d-4fbb-85f6-db2bb81b01cb.jpg',
    'stereoUrl': '',
    'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/xQa3ielE-thumbnail',
    'updatedAt': 1526283355000
  }, {
    'adjustedRawUrl': '',
    'panoramaName': 'others',
    'createdAt': 1526283353000,
    'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/47bbd8d6-75b2-4f15-91c0-cfdbb8c7f970.jpg',
    'cubemapReady': true,
    'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/JvTaielE-desktop',
    'floorplanRotation': 0,
    'index': 1,
    'is720': false,
    'isTopLogo': false,
    'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/JvTaielE-mobile',
    'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p2',
    'panoramaId': '47bbd8d6-75b2-4f15-91c0-cfdbb8c7f970',
    'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
    'position': { 'x': 0, 'y': 0 },
    'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/47bbd8d6-75b2-4f15-91c0-cfdbb8c7f970.jpg',
    'stereoUrl': '',
    'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/JvTaielE-thumbnail',
    'updatedAt': 1526283355000
  }, {
    'adjustedRawUrl': '',
    'panoramaName': 'others',
    'createdAt': 1526283353000,
    'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/5cf21b3e-ae20-49e1-9fef-0a4c9cba4564.jpg',
    'cubemapReady': true,
    'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/rnU6ielE-desktop',
    'floorplanRotation': 0,
    'index': 2,
    'is720': false,
    'isTopLogo': false,
    'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/rnU6ielE-mobile',
    'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p1',
    'panoramaId': '5cf21b3e-ae20-49e1-9fef-0a4c9cba4564',
    'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
    'position': { 'x': 0, 'y': 0 },
    'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/5cf21b3e-ae20-49e1-9fef-0a4c9cba4564.jpg',
    'stereoUrl': '',
    'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/rnU6ielE-thumbnail',
    'updatedAt': 1526283355000
  }, {
    'adjustedRawUrl': '',
    'panoramaName': 'others',
    'createdAt': 1526283353000,
    'cubemapFilePath': 'e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/b4530a6b-de01-4dba-9795-ab430556ff98.jpg',
    'cubemapReady': true,
    'desktopUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-desktop',
    'floorplanRotation': 0,
    'index': 0,
    'is720': false,
    'isTopLogo': false,
    'mobileUrl': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-mobile',
    'name': 'b7e548395-f720-49c4-95ce-e31217bd5ae2_p3',
    'panoramaId': 'b4530a6b-de01-4dba-9795-ab430556ff98',
    'panoramaRotation': { 'x': 0, 'y': 0, 'z': 0 },
    'position': { 'x': 0, 'y': 0 },
    'rawUrl': 'https://storage.googleapis.com/vrcam-dev-5a815-images/e88fa7c1-c5ad-453f-9a97-d4d4ad2cfc56/7e548395-f720-49c4-95ce-e31217bd5ae2/panoramas/b4530a6b-de01-4dba-9795-ab430556ff98.jpg',
    'stereoUrl': '',
    'thumbnail': 'https://vrcam-dev-api.istaging.com/api/v1/getresizemapping/fn77ielE-thumbnail',
    'updatedAt': 1526283355000
  }]
  res.status(HTTPStatus.OK).json(panoramas)
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})
