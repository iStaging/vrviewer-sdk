'use strict';
var request = require('request');
var router = require('express').Router();
var HTTPStatus = require('http-status');
var config = require('../config')

router.get('/panoCollection', function mainHandler (req, res) {
  // console.log(req.query)
  // var options = {
  //     url: config.apiServer + '/api/v1/panoCollection',
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
  var response = [{
    'panoramaName': 'name01',
    'downloadLink': 'https://storage.googleapis.com/vr-cam-161603.appspot.com/597efad3e330d900662d630d/images/fromImageIO/A2/T_D_6_K_i_e_l_g_A2.jpeg',
    'panoramaId': '0f62e098-b8aa-4a4a-a635-f2243788471f',
    'panoramaIndex': -25,
    'cubemapReady': true,
    'cubemapLinks': [
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg',
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_0f62e098-b8aa-4a4a-a635-f2243788471f.jpg'
    ]
  }, {
    'panoramaName': 'name02',
    'downloadLink': 'https://aframe.io/aframe/examples/boilerplate/panorama/puydesancy.jpg',
    'panoramaId': '782949e8-c37a-4171-a004-54c76937135c',
    'panoramaIndex': -24,
    'cubemapReady': true,
    'cubemapLinks': [
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_preview_782949e8-c37a-4171-a004-54c76937135c.jpg',
      'https://vrcam-test-cdn.istaging.com/d76d488e-0349-42c3-8f9d-99ae33cab2bf/aaa9a22a-7da1-4d97-9ef2-1ecc653e512c/panoramas/cubemap_%s_782949e8-c37a-4171-a004-54c76937135c.jpg'
    ]
  }]
  res.status(HTTPStatus.OK).json(response);
});

module.exports = router;
