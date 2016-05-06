/**
 * Created by HuangYuan on 2016/4/25.
 */
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function (app) {
    app.use('/admin/users', router);
};

router.get('/userList', function (req, res, next) {
    var pageSize = 10;
    var currPage = req.query.currPage !=undefined ? req.query.currPage : 1;
    User.find().exec(function (err,users) {
        if (err) return next(err);
        var count = users.length;
        var totalPage = Math.ceil(count / pageSize);
        User.find().sort({createTime : -1}).skip((currPage - 1) * pageSize).limit(pageSize).exec(function (err, users) {
            if (err) return next(err);
            res.render('admin/users/userlist', {
                title: '添加用户信息',
                pretty: true,
                currPage : currPage,
                totalPage : totalPage,
                users : users
            });
        });
    });


});
router.get('/create', function (req, res, next) {
    res.render('admin/users/users', {
        title: '添加用户信息',
        pretty: true
    });
});

/**
 * 保存用户信息
 */
router.post('/save', function (req, res, next) {
    var postJson = req.body;
    user = new User({
        realName: postJson.realName,
        loginName: postJson.loginName,
        password: postJson.password,
        email: postJson.email
    });
    user.save(user, function (err) {
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

