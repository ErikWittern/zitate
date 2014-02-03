var Bookmark = require('../models/bookmark.js'),
	mongoose = require('mongoose');

// HOMEPAGE ==========================================================
exports.index = function(req, res){
	Bookmark.find({}, function(err, bookmarks){
		if(err){
			console.log("Error retrieving bookmarks from MongoDB: " + err);
			bookmarks = [];
		}
		res.render('index', {
			title: 'All bookmarks', 
			bookmarks: bookmarks,
			user: req.user // get the user out of session and pass to template
		});
	});
};


// LOGIN ==========================================================
exports.login = function(req, res){
	// render the page and pass in any flash data if it exists
	res.render('login', { message: req.flash('loginMessage') }); 
}


// SIGNUP ==========================================================
exports.signup = function(req, res){
	// render the page and pass in any flash data if it exists
	res.render('signup', { message: req.flash('signupMessage') });
}

// LOGOUT ==========================================================
exports.logout = function(req, res){
	req.logout();
	res.redirect('/');
}

// PROFILE =========================================================
exports.profile = function(req, res){
	res.render('profile', {
		user : req.user // get the user out of session and pass to template
	});
}