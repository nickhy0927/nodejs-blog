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
    User.find().exec(function (err, users) {
        if (err) return next(err);
        res.render('admin/users/userlist', {
            title: '添加用户信息',
            pretty: true,
            users : users
        });
    });
});
router.get('/create', function (req, res, next) {
    res.render('admin/users/users', {
        title: '添加用户信息',
        pretty: true,
        users : users
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
                msg: '保存失败',
                code: 2
            };
            res.json(result)
        }
        var result = {
            msg: '保存成功',
            code: 1
        };
        res.json(result)
    });
    console.log(postJson);
});

