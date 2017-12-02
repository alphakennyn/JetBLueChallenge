var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TerminalSchema = new Schema({
  Code: {
    type: String
  }
},{
    collection: 'Terminals'
});

module.exports = mongoose.model('Terminal', TerminalSchema)