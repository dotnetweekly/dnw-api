var express = require('express');
const sanitize = require('mongo-sanitize');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var routes = require('./routes');
var connect = require('./db/connect');
const LRU = require('lru-cache');

const microCache = LRU({
	max: 1500,
	maxAge: 60000
});

var app = express();

app.use(logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function allowCrossDomain(req, res, next) {
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');

	var origin = sanitize(req.headers.origin);
	if (origin) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	}
	res.setHeader('Access-Control-Allow-Headers', 'content-type, Authorization');

	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
}

app.use(allowCrossDomain);

app.use('/api', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	console.log(err);
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use(function(err, req, res, next) {
	console.log(err);
	res.status(err.status || 500).send({
		success: false,
		message: err.message
	});
});

module.exports = app;
