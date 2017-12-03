var express = require('express');
var router = express.Router();

var Trip = require('../models/Trip');
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
  Trip.find(function(err,result){
    if(result){
      res.json(result);
    }
  }) 
  
});





module.exports = router;