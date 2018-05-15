// 'use strict';
// const request = require('request');
const router = require('express').Router()
const HTTPStatus = require('http-status')
// var config = require('../config')

// router.get('/downloadLink', function mainHandler (req, res) {
// console.log(req.query.fileName)
// console.log(req.body.panoCollectionId)
// var options = {
//     // panoCollectionId
//     // headers: {
//     //   'istaging-api-key': foundHeadquarter.apiKey
//     // }
// };
//
// request(options, function (error, response, body) {
//   res.status(HTTPStatus.OK).json(response);
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });
// res.status(HTTPStatus.OK).json([]);
// })
router.get('/', function mainHandler (req, res) {
  console.log('GET panorama')
  // console.log(req.query.filter)
  // var options = {
  //     url: config.apiServer + '/panoCollection',
  //     // headers: {
  //     //   'istaging-api-key': foundHeadquarter.apiKey
  //     // }
  // };
  //
  // request(options, function (error, response, body) {
  //   res.status(HTTPStatus.OK).json(response);
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  // });
  const response = [{
    'ID': '0f62e098-b8aa-4a4a-a635-f2243788471f',
    'panoramaName': 'name01',
    'DownloadUrl': 'https://storage.googleapis.com/vr-cam-161603.appspot.com/597efad3e330d900662d630d/images/fromImageIO/A2/T_D_6_K_i_e_l_g_A2.jpeg',
    'ResizeUrl': 'https://resize.example.com',
    'panoramaIndex': 0,
    'createdAt': 1522136180000,
    'updatedAt': 1522136180000,
    'cubemapReady': true,
    'cubemapLinks': [
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg'
    ]
  }, {
    'ID': '782949e8-c37a-4171-a004-54c76937135c',
    'panoramaName': 'name02',
    'downloadLink': 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
    'ResizeUrl': 'https://resize.example.com',
    'panoramaIndex': 1,
    'createdAt': 1522136180000,
    'updatedAt': 1522136180000,
    'cubemapReady': true,
    'cubemapLinks': [
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_782949e8-c37a-4171-a004-54c76937135c.jpg',
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_782949e8-c37a-4171-a004-54c76937135c.jpg'
    ]
  }]
  res.status(HTTPStatus.OK).json(response)
})

router.post('/', function mainHandler (req, res) {
  // console.log(req.query)
  // console.log(req.body.panoCollectionId)
  // var options = {
  //     // panoCollectionId
  //     // headers: {
  //     //   'istaging-api-key': foundHeadquarter.apiKey
  //     // }
  // };
  //
  // request(options, function (error, response, body) {
  //   res.status(HTTPStatus.OK).json(response);
  //   console.log('error:', error); // Print the error if one occurred
  //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //   console.log('body:', body); // Print the HTML for the Google homepage.
  // });
  // res.status(HTTPStatus.OK).json([]);
})

module.exports = router
