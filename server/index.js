// Initialization
var express			= require('express');
var mongoose		= require('mongoose');
var bodyParser		= require('body-parser');
var methodOverride	= require('method-override');
var _				= require('lodash');

// Create the application
var app 			= express();

// Add middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Support CORS
app.use(function(req, res, next){
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/meanapp');
mongoose.connection.once('open', function(){

	// Load the models
	app.models = require('./models/index');

	// Load the routes
	var routes = require('./routes');

	_.each(routes, function(controller, route){
		app.use(route, controller(app, route));
	});

	console.log("Listening to 127.0.0.1:3000 or localhost:3000");
	app.listen(3000);
});
