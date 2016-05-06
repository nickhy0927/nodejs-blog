// Example model

var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  	title: String,
  	content: String,
	slug: {type: String, required: true},
	category: [{type: Schema.Types.ObjectId, ref: 'Category'}],
	author: [{type: Schema.Types.ObjectId, ref: 'User'}],
	published: {type: Boolean, default: false},
	meta: {type: Schema.Types.Mixed},
	comments: [Schema.Types.Mixed],
  	createTime : {type:Date,default : new Date()}
});

mongoose.model('Article', ArticleSchema);

