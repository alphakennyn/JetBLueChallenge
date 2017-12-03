var express = require('express');
var router = express.Router();

var Trip = require('../models/Trip');


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

module.exports = router;