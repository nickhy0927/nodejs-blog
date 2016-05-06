/**
 * Created by HuangYuan on 2016/5/6.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');


module.exports = function (app) {
    app.use('/blog/users', router);
};

router.post('/register', multipartMiddleware, function (req, res, next) {
    console.log(req.files);
    //创建表单上传
    var form = new formidable.IncomingForm();
    //设置编辑
    form.encoding = 'utf-8';
    //设置文件存储路径
    form.uploadDir = "./public/files/";
    //保留后缀
    form.keepExtensions = true;
    //设置单文件大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和
    form.parse(req, function(err, fields, files) {
        console.log(util.inspect({fields: fields, files: files}));
    });
    res.jsonp(req.files);
});

