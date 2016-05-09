/**
 * Created by HuangYuan on 2016/5/9.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose');

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