var mongoose = require('mongoose');

var recipesSchema = mongoose.Schema({
    recipe_name: {type: String, required: true},
    user: String,
    category: {type: String, required: true},
    rating: Number,
    description: String,
    ingredients: {type: [String], required: true},
    steps: {type: [String], required: true},
    notes: [String],
    image: String
});

var Recipes = mongoose.model('Recipes', recipesSchema);
module.exports = Recipes;
