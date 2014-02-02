var Bookmark = require('../models/bookmark.js'),
	mongoose = require('mongoose');


/*
 * POST bookmark:
 */
exports.create = function(req, res){
	var bookmark = new Bookmark({
		url: req.body.url,
		title: req.body.title,
		description: req.body.description,
		tags: req.body.tags,
	});
	bookmark.save(function(err, result){
		if (err){
			console.log("Adding bookmark failed: " + err);
		} else {
			console.log(result);
			res.send(result);
		}
	});
};


/*
 * GET bookmarks:
 * - Get all, if no tags are provided
 * - Get the ones matching provided tags
 */
exports.retrieveByTags = function(req, res){
	console.log("retrieveByTags: " + req.query.tags);
	if(req.query.tags === undefined){
		Bookmark.find({}, function(err, bookmarks){
			if(err){
				console.log("Error retrieving bookmarks from MongoDB: " + err);
				bookmarks = [];
			}
			res.render('bookmarks', {bookmarks: bookmarks});
		});
	} else {
		Bookmark.find( {tags: {$all: req.query.tags}} , function(err, bookmarks){
			if(err){
				console.log("Error retrieving bookmarks from MongoDB: " + err);
				bookmarks = [];
			}
			console.log(bookmarks.length + " bookmarks found.");
			res.render('bookmarks', {bookmarks: bookmarks});
		});
	}
};


/*
 * POST like:
 */
exports.updateLikes = function(req, res){
	console.log("Update likes of " + req.params.id + " with likes: " + req.body.likes);
	Bookmark.update(
		{_id: req.params.id},
		{likes: req.body.likes},
		{multi: false},
		function(err, rows_updated) {
			if (err) throw err;
			res.send(req.body.likes);
		}
	);
};







/*
 * POST dummies:
 */
exports.createDummies = function(req, res){
	var bookmarks = {
	1:	{
			url: 			"http://nodeweekly.us1.list-manage.com/track/click?u=0618f6a79d6bb9675f313ceb2&id=e172761d76&e=350e132e73",
			title: 			"Node.js and Express 101",
			description:	"A 92 minute screencast that teaches Node and Express from scratch.",
			tags: 			["Node.js", "Express.js", "Video", "Tutorial"]
		},
	2:	{
			url: 			"http://nodeweekly.us1.list-manage.com/track/click?u=0618f6a79d6bb9675f313ceb2&id=7634957a5b&e=350e132e73",
			title: 			"Node.js, MongoDB, and You: An Intro in Parts",
			description:	"A straightforward guide to getting started using MongoDB with Node. Not much new here but a reasonably compact example of bringing the two technologies together.",
			tags: 			["Node.js", "MongoDB", "Tutorial"]
		},
	3:	{
			url: 			"http://nodeweekly.us1.list-manage1.com/track/click?u=0618f6a79d6bb9675f313ceb2&id=9b8d3dce16&e=350e132e73",
			title: 			"Token-based Authentication with Socket.IO",
			description:	"Authentication in realtime frameworks can be challenging. José looks at an approach using tokens with Express and socket.io.",
			tags: 			["Node.js", "Socket.IO", "Tutorial", "Authentication"]
		}
	}
	Object.keys(bookmarks).forEach(function(key){
		var bookmark = new Bookmark({
			url: bookmarks[key].url,
			title: bookmarks[key].title,
			description: bookmarks[key].description,
			tags: bookmarks[key].tags
		});
		bookmark.save(function(err, result){
			if (err){
				console.log("Adding bookmark failed: " + err);
			} else {
				console.log(result);
			}
		});

	});
	res.send("OK");
};


