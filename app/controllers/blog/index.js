var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article');

module.exports = function (app) {
    app.use('/article', router);
};

router.post('/create', function (req, res, next) {
    res.jsonp(req.body);
});

router.get('/', function (req, res, next) {
    Article.find(function (err, articles) {
        if (err) return next(err);
        res.render('blog/index', {
            title: '博客首页',
            articles: articles,
            pretty: true
        });
    });
});
