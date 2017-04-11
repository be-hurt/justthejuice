var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || 'localhost');
app.disable('x-powered-by');

//mongodb setup
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var credentials = require('./credentials.js');
var Recipe = require('./models/recipes.js');
var User = require('./models/users.js');

require('./lib/recipesData.js');
require('./lib/userData.js');

//my scripts


//set up handlesbars view engine
var handlesbars = require('express-handlebars')
    .create({defaultLayout: 'main',
        helpers: {
            section: function (name, options) {
                if (!this._sections) {
                    this._sections = {};
                }
                this._sections[name] = options.fn(this);
                return null;
            }
        }
});
app.engine('handlebars', handlesbars.engine);
app.set('view engine', 'handlebars');


//Startup
app.use(express.static(__dirname + '/public'));

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret
}));

app.use(require('body-parser').urlencoded({extended : true}));

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
    next();
});

//flash messages
app.use(function(req, res, next) {
    //if there's a flash message, transfer if to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

//MongoDB setup
var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
};
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
};

//Routes
app.get('/', function (req, res) {
    Recipe.find(function (err, recipes) {
        var context = {
            recipes: recipes.map (function (Recipe) {
                return {
                    recipe_name: Recipe.recipe_name,
                    user: Recipe.user,
                    category: Recipe.category,
                    rating: Recipe.rating,
                    description: Recipe.description,
                    ingredients: Recipe.ingredients,
                    steps: Recipe.steps,
                    notes: Recipe.notes,
                    image: Recipe.image
                };
            })
        };
        //function that returns a random recipe;
        function get_random () {
            var idx = Math.floor(Math.random() * context.recipes.length);
            return context.recipes[idx];
        }
        var random_recipe = get_random();
        res.render('home', random_recipe);
    });
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/my-account', function (req, res) {
    res.render('my-account');
});

app.get('/new-recipe', function (req, res) {
    res.render('new-recipe', {recipe_id: req.query.recipe_id});
});

app.post('/new-recipe', function(req, res){
    Recipe.update(
        {recipe_name: req.body.recipe_name,
        user: req.body.user,
        category: req.body.category,
        rating: 0,
        description: req.body.description,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        notes: req.body.notes,
        image: ' '},
        {$push: {recipe_id: req.body.recipe_id}},
        {upsert: true},
        function(err){
        if(err) {
            console.error(err.stack);
            req.session.flash = {
                type: 'danger',
                intro: 'Oops!',
                message: 'There was an error processing your request.'
            };
            return res.redirect(303, '/recipes');
        }
        req.session.flash = {
            type: 'success',
            intro: 'Thank you!',
            message: 'Your recipe has been added to the database.'
        };
        return res.redirect(303, '/recipes');
        }
    );
});

app.get('/recipes', function (req, res) {
    Recipe.find(function (err, recipes) {
        var context = {
            recipes: recipes.map (function (Recipe) {
                return {
                    recipe_name: Recipe.recipe_name,
                    user: Recipe.user,
                    category: Recipe.category,
                    rating: Recipe.rating,
                    description: Recipe.description,
                    ingredients: Recipe.ingredients,
                    steps: Recipe.steps,
                    notes: Recipe.notes,
                    image: Recipe.image
                };
            })
        };
        res.render('recipes', context);
    });
});

//404 catch all handler (middleware)
app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Express started on http://' + app.get('ip') + ':' + app.get('port') + '; press Ctrl-C to terminate.');
});
