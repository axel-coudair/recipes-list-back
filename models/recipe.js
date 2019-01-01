var mongoose = require('mongoose'), Schema = mongoose.Schema;
const User = require('./user')
// const House = require('./house')

var RecipesSchema = new mongoose.Schema({
  // houseId: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   ref: 'House'
  // },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    trim: true
  },
  stapes: [{
    type: String,
    required: true,
    trim: true
  }],
  numberOfEaters: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  ingredients: [{
    type: Object,
    required: true,
    ref: 'Ingredient'
  }]
});
var Recipes = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipes;