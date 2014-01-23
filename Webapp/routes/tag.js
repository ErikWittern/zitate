var Bookmark = require('../models/bookmark.js'),
	mongoose = require('mongoose');


/*
 * GET tags:
 */
exports.retrieve = function(req, res){
	Bookmark.find().distinct('tags', function(err, tags){
		res.send(tags);
	});
};













