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

recipesSchema.methods.sort_ingredients = function () {
    for (var i=0, len = this.ingredients.length; i < len; i++) {
        $('#ingredients_list').append('<li>'i'</li>');
    }
};

recipesSchema.methods.sort_steps = function () {
    for (var i=0, len = this.steps.length; i < len; i++) {
        $('#steps_list').append('<li>'i'</li>');
    }
};

recipesSchema.methods.sort_notes = function () {
    for (var i=0, len = this.notes.length; i < len; i++) {
        $('#notes_list').append('<li>'i'</li>');
    }
};


var Recipes = mongoose.model('Recipes', recipesSchema);
module.exports = Recipes;
