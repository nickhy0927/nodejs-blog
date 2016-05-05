var express = require('express'),
    router = express.Router();

module.exports = function (app) {
	console.info("url:",app.locals.urlpath);
    app.use('/admin', router);
};

router.get('/', function (req, res, next) {
    res.render('admin/home/home', {
        title: '博客系统管理',
        pretty: true
    });
});
