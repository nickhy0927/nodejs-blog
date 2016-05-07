/**
 * Created by HuangYuan on 2016/5/6.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Category = mongoose.model('Category');

module.exports = function (app) {
    app.use('/admin/category', router);
};

router.get('/categoryList', function (req, res, next) {
    var pageSize = 10;
    var currPage = req.query.currPage !=undefined ? req.query.currPage : 1;
    Category.find().exec(function (err,categories) {
        if (err) return next(err);
        var count = categories.length;
        var totalPage = Math.ceil(count / pageSize);
        Category.find().sort({createTime : -1}).skip((currPage - 1) * pageSize).limit(pageSize).exec(function (err, categories) {
            if (err) return next(err);
            res.render('admin/category/categoryList', {
                title: '查询文章分类信息',
                pretty: true,
                currPage : currPage,
                totalPage : totalPage,
                categories : categories
            });
        });
    });


});
router.get('/create', function (req, res, next) {
    res.render('admin/category/category', {
        title: '添加文章分类',
        pretty: true
    });
});

/**
 * 保存文章分类信息
 */
router.post('/save', function (req, res, next) {
    var postJson = req.body;
    var category = new Category({
        title: postJson.title,
        slug: postJson.slug
    });
    category.save(category, function (err) {
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

