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
  FareDollarAmount: {
    type: Number
  },
  TaxDollarAmount: {
    type: Number
  },
  Desirability: {
    type: Number
  },
  UrbanBigness: {
    type: Number
  },
  Comments: {
    type: String
  }
},{
    collection: 'Deals'
});

module.exports = mongoose.model('Trip', TripSchema)