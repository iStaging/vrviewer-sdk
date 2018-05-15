'use strict';
const request = require('request');
const router = require('express').Router();
const HTTPStatus = require('http-status');
// var config = require('../config')

router.get('/', function mainHandler (req, res) {
  // console.log(req.query)
  // console.log(req.params.xxx)
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
  // res.status(HTTPStatus.OK).json([]);
});

router.post('/', function mainHandler (req, res) {
  // console.log(req.query)
  // console.log(req.params.xxx)
  // console.log(req.body.panoCollectionName)
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
  // res.status(HTTPStatus.OK).json([]);
});

module.exports = router;
