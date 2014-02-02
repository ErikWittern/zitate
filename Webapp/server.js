
// module dependencies =================================
var express		= require('express');
var routes		= require('./routes');
var http		= require('http');
var path		= require('path');
var passport	= require('passport');
var mongoose	= require('mongoose');
var configDB	= require('./config/database.js');
var flash		= require('connect-flash');
var port 		= process.env.PORT || 3000;

var app = express();

// DB connection ======================================
mongoose.connect(configDB.url); // connect to DB
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	console.log("Connection to DB established.");
});

// app configuration ======================================
require('./config/passport')(passport); // pass passport for configuration

app.configure(function(){
	app.set('views', __dirname + '/views'); // define where views are
	app.set('view engine', 'jade'); // set view engine
	app.use(express.favicon()); // render favicon
	app.use(express.logger('dev'));  // log every request to the console
	app.use(express.bodyParser()); // get information from html forms
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.methodOverride()); // simulates DELETE and PUT
	app.use(express.static(path.join(__dirname, 'public')));
	// required for passport:
	app.use(express.session({ secret: 'demonstratio' })); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session
});

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Demonstratio launched on port ' + port);