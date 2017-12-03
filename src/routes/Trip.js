var express = require('express');
var router = express.Router();

var Trip         = require('../models/Trip');
var Terminal         = require('../models/Terminals');

/* GET trip with matching origin and destination listing. */



/* GET all Terminal listing. */
router.get('/', function(req, res, next) {
  // And insert something like this instead:
  Terminal.find(function(err,result){
    if(result){
      res.json(result);
    }
  }) 
  
});

/* GET trip with matching origin and destination listing. */
router.get('/singleTrip/:start/:end', function(req, res, next) {
  Trip.find({"OriginAirportCode": req.params.start, "DestinationAirportCode": req.params.end} ,function(err,result){
    if(result){
      res.json(result);
    }
  }) 
  
});




module.exports = router;