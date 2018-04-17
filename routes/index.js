'use strict';
var request = require('request');
var router = require('express').Router();
var HTTPStatus = require('http-status');
var config = require('../config')

router.get('/panoCollection', function mainHandler (req, res) {
  console.log(req.query)
  var options = {
      url: config.apiServer + '/api/v1/panoCollection',
      // headers: {
      //   'istaging-api-key': foundHeadquarter.apiKey
      // }
  };

  request(options, function (error, response, body) {
    res.status(HTTPStatus.OK).json(response);
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
  });
});

module.exports = router;
