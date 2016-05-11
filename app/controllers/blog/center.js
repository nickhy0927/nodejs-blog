/**
 * Created by HuangYuan on 2016/5/9.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');
var multipart = require ('connect-multiparty');
var multipartMiddleware = multipart ();
http = require ('http'),
    fs = require ('fs'),
    util = require ('util');

module.exports = function (app) {
    app.use('/blog/user', router);
};
router.get('/center', function (req, res, next) {
    res.render('blog/center/center', {
        title: '关于博客',
        articles: [],
        pretty: true
    });
});

/**
 * upload file
 */
router.post('/upload/pic',multipartMiddleware,function (req,res,next) {
    console.log(req.files);
    res.json({
        code : 1,
        msg : 'success'
    })
});