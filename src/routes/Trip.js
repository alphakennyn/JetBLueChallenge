var express = require('express');
var router = express.Router();

var Trip         = require('../models/Trip');
var Terminal         = require('../models/Terminals');

/* GET trip with matching origin and destination listing. */

// router.get('/', function(req, res, next) {
//   Trip.find({"FareType": "LOWEST"}).limit(10).then(function(result,err){
//     if(result){
//       res.json(result);
//     }
//   }) 
  
// });

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
  Trip.find({
    "FareType": "LOWEST", 
    "OriginAirportCode": req.params.start, 
    "DestinationAirportCode": req.params.end,
    "IsDomesticRoute": 1
  }, function(err, result){
    if(result){
      res.json(result);
    }
  }) 
  
});




module.exports = router;