var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var UserSchema = new Schema({
  	realName: String,
  	loginName: String,
  	password: String,
  	email:String,
	file: [{type: Schema.Types.ObjectId, ref: 'File'}],
  	lastTime:{type:Date,default : new Date()},
  	createTime : {type:Date,default : new Date()}
});

mongoose.model('User', UserSchema);

