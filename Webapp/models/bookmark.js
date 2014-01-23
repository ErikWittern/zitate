var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var bookmarkSchema = new Schema({
	url: String,
	title: String,
	description: String,
	created: {type: Date, default: Date.now},
	tags: [String],
	likes: {type: Number, default: 0}
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);