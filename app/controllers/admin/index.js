var express = require('express'),
    router = express.Router();

module.exports = function (app) {
    app.use('/admin', router);
};

router.get('/', function (req, res, next) {
    res.render('admin/home/home', {
        title: '博客系统管理',
        pretty: true
    });
});

router.get('/login', function (req, res, next) {
    res.render('admin/login/login', {
        title: '博客系统管理',
        pretty: true
    });
});
