var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || 'localhost');
app.disable('x-powered-by');

//mongodb setup
var mongoose = require('mongoose');

var credentials = require('./credentials.js');
var Recipe = require('./models/recipes.js');

require('./lib/recipesData.js');

//my scripts

//set up handlesbars view engine
var handlesbars = require('express-handlebars')
    .create({defaultLayout: 'main',
        helpers: {
            section: function (name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            }
        }
        });
app.engine('handlebars', handlesbars.engine);
app.set('view engine', 'handlebars');


//Startup
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.locals.showTests = app.get('env') !== 'production' &&
        req.query.test === '1';
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
    res.render('home', context);
    });
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/my-account', function (req, res) {
    res.render('my-account');
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
