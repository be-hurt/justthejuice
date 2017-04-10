var mongoose = require('mongoose');

var recipeListenerSchema = mongoose.Schema({
    recipe_name: {type: String, required: true},
    user: String,
    category: {type: String, required: true},
    rating: Number,
    description: String,
    ingredients: {type: [String], required: true},
    steps: {type: [String], required: true},
    notes: [String],
    image: String,
    recipe_id: [String]
});

var recipeListener = mongoose.model('recipeListener', recipeListenerSchema);
module.exports = recipeListener;
