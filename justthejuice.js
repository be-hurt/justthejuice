var express = require('express');

var app = express();

var credentials = require('./credentials.js');

//mongodb setup
var mongoose = require('mongoose');
var Recipes = require('./models/recipes.js');

var opts = {
    server: {
        socketOptions: {keepAlive: 1}
    }
};
switch(app.get('env')){
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, opts);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, opts);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}

//my scripts

//set up handlesbars view engine
var handlesbars = require('express-handlebars')
    .create({defaultLayout: 'main',
            helpers: {
                section: function(name, options){
                    if(!this._sections) this._sections = {};
                    this._sections[name] = options.fn(this);
                    return null;
                }
            }
    });
app.engine('handlebars', handlesbars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/my-account', function (req, res) {
    res.render('my-account');
});

app.get('/all-recipes', function (req, res) {
    res.render('all-recipes');
});

//404 catch all handler (middleware)
app.use(function(req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
});
