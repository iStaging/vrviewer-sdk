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
  var response = [
    {
      panoramaName: 'name01',
      downloadLink: 'https://vrcam-test-api.istaging.com/api/v1/getresizemapping/Vwz2ielD-desktop',
      panoramaId: 'id01',
      panoramaIndex: 0,
      cubemapReady: true,
      cubemapLinks: ['cubemap-url1.jpg,', 'cubemap-url2.jpg', 'cubemap-url3.jpg'],
    }
  ]
  res.status(HTTPStatus.OK).json(response);
});

module.exports = router;
