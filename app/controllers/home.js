var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article');

module.exports = function (app) {
    app.use('/', router);
};
router.get('/', function (req, res, next) {
    res.redirect('/article');
});

router.get('/about', function (req, res, next) {
    res.render('blog/index', {
        title: '关于博客',
        pretty: true
    });
});
router.get('/contacts', function (req, res, next) {
    res.render('blog/index', {
        title: '联系我',
        pretty: true
    });
});