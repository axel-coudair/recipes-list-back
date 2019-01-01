const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')

const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const User = require('./models/user'),
	jwt = require("jsonwebtoken");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const planningsRouter = require('./routes/plannings');
const housesRouter = require('./routes/houses');
const { MONGODB_URI, PORT } = require("./config");
mongoose.connect(
	process.env.MONGODB_URI ||
	MONGODB_URI, {
		useCreateIndex: true,
		useNewUrlParser: true
	  }
);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var db = mongoose.connection;

app.use(function (req, res, next) {
	if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
		jwt.verify(req.headers.authorization.split(' ')[1], "RESTFULAPIs", function (err, decode) {
			if (err) req.user = undefined
			req.user = decode
			next();
		})
	} else {
		req.user = undefined
		next();
	}
})

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
	// we're connected!
});


//use sessions for tracking logins
app.use(session({
	secret: 'work hard',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({
		mongooseConnection: db
	})
}))

// CORS
app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');
	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);
	// Pass to next layer of middleware
	next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/recipes', recipesRouter);
app.use('/houses', housesRouter);
app.use('/plannings', planningsRouter);

// catch 404 and forward to error handler

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({ error: 'Something failed!' });
	} else {
		next(err);
	}
}
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	console.log(err);
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}
	return res.status(err.status || 500).json({ status: "error", message: err.message })
});

//Launch app
app.listen(PORT, () => {
	console.log(`App start on port ${PORT}`);
});

module.exports = app;
