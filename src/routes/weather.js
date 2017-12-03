var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var express = require('express');
var router = express.Router();

function getInfoForAirportCode(code) {
	var url = 'http://services.faa.gov/airport/status/' + code + '?format=application/json'
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send();

    var loc = JSON.parse(request.responseText);
    console.log(loc)

    var formattedInfo = {
    	'locationName': loc.city + ', ' + loc.state,
    	'temp': loc.temp,
    }
    console.log(formattedInfo);
}
router.get('/:code', function(req, res, next) {
  // And insert something like this instead:
  res.json(getInforForAirportCode(req.params.code));
  
});
getInfoForAirportCode("SFO")