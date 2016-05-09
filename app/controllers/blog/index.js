var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article');

module.exports = function (app) {
    app.use('/blog', router);
};
router.get('/about', function (req, res, next) {
    res.render('blog/index', {
        title: '关于博客',
        articles: [],
        pretty: true
    });
});
router.get('/contacts', function (req, res, next) {
    res.render('blog/index', {
        title: '联系我',
        articles: [],
        pretty: true
    });
});

/**
 * 进入注册页面
 */
router.get('/register', function (req, res, next) {
    res.render('blog/register/register', {
        title: '用户注册',
        articles: [],
        pretty: true
    });
});

router.get('/login', function (req, res, next) {
    res.render('blog/login/login', {
        title: '用户登录',
        pretty: true
    });
});

router.post('/create', function (req, res, next) {
    res.jsonp(req.body);
});

router.get('/', function (req, res, next) {
    var user = req.session.user;
    console.log(user);
    Article.find({published:true}).exec(function (err, articles) {
        if (err) return next(err);
        res.render('blog/index', {
            pageTitle: '博客首页',
            title: '所有博客',
            articles: articles,
            user : user,
            pretty: true
        });
    });
});
