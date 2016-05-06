/**
 * Created by HuangYuan on 2016/5/6.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Article = mongoose.model('Article');

module.exports = function (app) {
    app.use('/admin/article', router);
};

router.get('/articleList', function (req, res, next) {
    var pageSize = 10;
    var currPage = req.query.currPage !=undefined ? req.query.currPage : 1;
    Article.find().exec(function (err,articles) {
        if (err) return next(err);
        var count = articles.length;
        var totalPage = Math.ceil(count / pageSize);
        Article.find().sort({createTime : -1}).skip((currPage - 1) * pageSize).limit(pageSize).exec(function (err, articles) {
            if (err) return next(err);
            res.render('admin/article/articleList', {
                title: '文章内容列表',
                pretty: true,
                currPage : currPage,
                totalPage : totalPage,
                articles : articles
            });
        });
    });


});
router.get('/create', function (req, res, next) {
    res.render('admin/article/articles', {
        title: '添加文章分类',
        pretty: true
    });
});

/**
 * 保存文章分类信息
 */
router.post('/save', function (req, res, next) {
    var postJson = req.body;
    var article = new Article({
        title: postJson.title,
        slug: postJson.slug
    });
    article.save(article, function (err) {
        if (err) {
            var result = {
                info: '保存失败',
                status: 'n'
            };
            res.json(result)
        }
        var result = {
            info: '保存成功',
            status: 'y'
        };
        res.json(result)
    });
    console.log(postJson);
});