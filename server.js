
// server.js

// BASE SETUP
// ==========================================================================================================

// call the packages we need
var express = require('express');					// call express
var mongoose = require('mongoose');					// call mongoose
var app = express();								// define our app using express
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

var port    = 	process.env.PORT || 3000;			// set our port

mongoose.connect('mongodb://localhost/media'); 		// connect to our database

var Bear     = require('./backend/models/bear');

// ROUTES
// ==========================================================================================================

var router = express.Router();						// get an instance of the express Router

//
// route middleware that will happen on every request
router.use(function(req, res, next) {

	console.log(req.method, req.url);				// log each request to the console

	next();											// continue doing what we were doing and go to the route
});

// ----------------------------------------------------------------------------------------------------------
// index 
router.get('/', function(req, res){
	
	res.json({ message: 'Welcome!' });

});

// ----------------------------------------------------------------------------------------------------------
// login
router.route('/login')
	// show the form (GET http://localhost:8080/login)
	.get(function(req, res) {
		//res.send('this is the login form');
		res.json({ message: 'this is the login form'});
	})
	// process the form (POST http://localhost:8080/login)
	.post(function(req, res) {
		console.log('processing');
		//res.send('processing the login form!');
		res.json({ message: 'processing the login form!'});
	});

// ----------------------------------------------------------------------------------------------------------
// bears
router.route('/bears')

	// [POST]
	// create a bear (accessed at POST http://localhost:3000/bears)
	.post(function(req, res) {

		var bear = new Bear(); 		// create a new instance of the Bear model
		bear.name = req.body.name;  // set the bears name (comes from the request)

		// save the bear and check for errors
		bear.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Bear created!' });
		});
		
	})

	// [GET]
	// get all the bears (accessed at GET http://localhost:3000/bears)
	.get(function(req, res) {
		Bear.find(function(err, bears) {
			if (err)
				res.send(err);

			res.json(bears);
		});
	});

router.route('/bears/:bear_id')

	// [GET]
	// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
	.get(function(req, res) {
		Bear.findById(req.params.bear_id, function(err, bear) {
			if (err)
				res.send(err);
			res.json(bear);
		});
	})

	// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
	.put(function(req, res) {

		// use our bear model to find the bear we want
		Bear.findById(req.params.bear_id, function(err, bear) {

			if (err)
				res.send(err);

			bear.name = req.body.name; 	// update the bears info

			// save the bear
			bear.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Bear updated!' });
			});

		})

		// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
		.delete(function(req, res) {
			Bear.remove({
				_id: req.params.bear_id
			}, function(err, bear) {
				if (err)
					res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});
	});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', router);



// ERROR HANDLING
// ==========================================================================================================

app.get('*', function(req, res, next) {

	var err = new Error('does not exist!');
	err.status = 404;
	next(err);
	
});

function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Something blew up!' });
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.render('error', { error: err });
}



// START THE SERVER
// ==========================================================================================================

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});