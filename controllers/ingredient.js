var mongoose = require('mongoose'), Schema = mongoose.Schema;

var IngredientSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number,
    trim: true
  },
  unit: {
    type: String,
    required: true,
    trim: true
  },
  checked: {
    type: Boolean,
    default: false
  }
});
var Ingredient = mongoose.model('Ingredient', IngredientSchema);
module.exports = Ingredient;