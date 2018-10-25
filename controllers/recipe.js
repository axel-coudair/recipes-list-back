var mongoose = require('mongoose'), Schema = mongoose.Schema;
const House = require('./house')

var RecipesSchema = new mongoose.Schema({
  houseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'House'
  },
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  public: {
    type: Boolean,
    default: false
  },
  ingredients: [{
    type: String,
    // required: true,
    trim: true
  }]
});
var Recipes = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipes;