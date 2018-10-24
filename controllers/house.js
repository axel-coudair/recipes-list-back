var mongoose = require('mongoose'), Schema = mongoose.Schema;
const User = require('./user')
var HouseSchema = new mongoose.Schema({
  adminId: {
    type: String,
    unique: true,
 //   required: true,
    trim: true
  },
  users: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});
var House = mongoose.model('House', HouseSchema);
module.exports = House;