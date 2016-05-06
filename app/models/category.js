/**
 * Created by huangyuan on 16-4-16.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true},
    created: {type:Date,default : new Date()}
});
mongoose.model('Category', CategorySchema);

