/**
 * Created by HuangYuan on 2016/5/6.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FileSchema = new Schema({
    name: {type: String, required: true},
    path: {type: String},
    size: {type: String},
    type: {type: String, required: true},
    createTime: {type:Date,default : new Date()}
});
mongoose.model('File', FileSchema);
