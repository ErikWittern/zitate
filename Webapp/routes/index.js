var Bookmark = require('../models/bookmark.js'),
	mongoose = require('mongoose');

/*
 * GET home page.
 */
exports.index = function(req, res){
	Bookmark.find({}, function(err, bookmarks){
		if(err){
			console.log("Error retrieving bookmarks from MongoDB: " + err);
			bookmarks = [];
		}
		res.render('index', {title: 'All bookmarks', bookmarks: bookmarks});
	});
};