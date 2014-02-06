// routes.js
var homepage	= require('./controllers/homepage');
var bookmark	= require('./controllers/bookmark');
var tag			= require('./controllers/tag');


module.exports = function(app, passport) {
	// HOME PAGE
	app.get('/', homepage.index);

	// LOGIN
	app.get('/login', homepage.login);
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// SIGNUP
	app.get('/signup', homepage.signup);
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// LOGOUT
	app.get('/logout', homepage.logout);

	// PROFILE
	app.get('/profile', isLoggedIn, homepage.profile);

	// BOOKMARKS
	app.post('/bookmarks', bookmark.create);
	app.post('/bookmarks/dummies', bookmark.createDummies);
	app.post('/bookmarks/likes/:id?', isLoggedInAPI, bookmark.increaseLikes);
	app.post('/bookmarks/dislikes/:id?', isLoggedInAPI, bookmark.decreaseLikes);
	app.get('/bookmarks/:tags?', bookmark.retrieveByTags);
	
	// TAGS
	app.get('/tags', tag.retrieve);
}


// route middleware to make sure user is logged in
// to be used with REST API calls, returns
function isLoggedInAPI(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if user isn't authorized, send 403
	res.send(403, 'Sorry! you cant see that.');

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on 
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}