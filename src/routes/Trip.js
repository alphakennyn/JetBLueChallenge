var express = require('express');
var router = express.Router();

var Trip         = require('../models/Trip');
var Terminal         = require('../models/Terminals');

/* GET trip with matching origin and destination listing. */



/* GET all Terminal listing. */
router.get('/', function(req, res, next) {
  // And insert something like this instead:
  Trip.find(function(err,result){
    if(result){
      // console.log(result.DestinationAirportCode);
      res.json(result);
    }
  }) 
  
});

/* GET trip with matching origin and destination listing. */
router.get('/singleTrip/:end', function(req, res, next) {
  Trip.find({ "DestinationAirportCode": req.params.end} ,function(err,result){
    if(result){
      res.json(result);
    }
  }) 
  
});




module.exports = router;