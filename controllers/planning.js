var mongoose = require('mongoose'), Schema = mongoose.Schema;
const Recipes = require('./recipe')
const House = require('./house')
var PlanningSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Recipes'
  },
  houseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'House'
  },
  ingredients: [{
    type: Object
  }]
});
var Planning = mongoose.model('Planning', PlanningSchema);
module.exports = Planning;