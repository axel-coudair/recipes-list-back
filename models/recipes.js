var mongoose = require('mongoose');
var RecipesSchema = new mongoose.Schema({
  houseId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  steps: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  ingredients: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
});
var Recipes = mongoose.model('Recipes', RecipesSchema);
module.exports = Recipes;