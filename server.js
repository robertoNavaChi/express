
// server.js

// BASE SETUP
// ==============================================

var express = require('express');
var app = express();
var port    = 	process.env.PORT || 3000;
var router = express.Router();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');



// ROUTES
// ==============================================

// route middleware that will happen on every request
router.use(function(req, res, next) {

	// log each request to the console
	console.log(req.method, req.url);

	// continue doing what we were doing and go to the route
	next();	
});

router.get('/', function(req, res){
	console.log('Welcome!');

	res.json({ message: 'Welcome!' });
});

app.route('/login')
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

router.get('/hello/:name', function(req, res) {

	res.json({ message: 'Welcome '+ req.params.name + '!'});
	//res.send('hello ' + req.params.name + '!');
});

app.use('/', router);



// ERROR HANDLING
// ==============================================

app.get('*', function(req, res, next) {

	var err = new Error('does not exist!');
	err.status = 404;
	next(err);
	
});

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

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
// ==============================================

var server = app.listen(port, function() {
    console.log('Listening on port %d', server.address().port);
});