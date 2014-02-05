var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	moment = require('moment');

var bookmarkSchema = new Schema({
	url: String,
	title: String,
	description: String,
	created: {type: Date, default: Date.now},
	tags: [String],
	likes: {type: Number, default: 0}
});

// virtual property, using moment.js to beautify 'created'
bookmarkSchema.virtual('createdWords').get(function(){
	return moment(this.created).fromNow();
});

module.exports = mongoose.model('Bookmark', bookmarkSchema);