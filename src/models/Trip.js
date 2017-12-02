var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  FinalScore: {
    type: Number
  },
  OriginAirportCode: {
    type: String    
  },
  DestinationAirportCode: {
    type: String    
  },      
  FareType: {
    type: String
  },
  LastDatOfFare: {
    type: Date
  }
},{
    collection: 'Deals'
});

module.exports = mongoose.model('Trip', TripSchema)