var express = require('express');

var app = express();

//set up handlesbars view engine
var handlesbars = require('express-handlebars')
    .create({defaultLayout: 'main'});
app.engine('handlebars', handlesbars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
