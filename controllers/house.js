var mongoose = require('mongoose'), Schema = mongoose.Schema;
const User = require('./user')
// const House = require('./house')
var HouseSchema = new mongoose.Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  users: [{
    type: Schema.Types.ObjectId, ref: 'User'
  }],
  name: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  // password: {
  //   type: String,
  //   required: true, select: false
  // },
});

// //hashing a password before saving it to the database
// HouseSchema.pre('save', function (next) {
//   var house = this;
//   bcrypt.hash(house.password, 10, function (err, hash){
//     if (err) {
//       return next(err);
//     }
//     house.password = hash;
//     next();
//   })
// });

// //authenticate input against database
// HouseSchema.statics.authenticate = function (email, password, callback) {
//   User.findOne({ email: email }).select('+password')
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }

var House = mongoose.model('House', HouseSchema);
module.exports = House;