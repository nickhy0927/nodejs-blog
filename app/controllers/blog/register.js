/**
 * Created by HuangYuan on 2016/5/6.
 */
var express = require ('express'),
	router = express.Router (),
	mongoose = require ('mongoose'),
	User = mongoose.model ('User'),
	File = mongoose.model ('File');
var multipart = require ('connect-multiparty');
var multipartMiddleware = multipart ();
	http = require ('http'),
	fs = require ('fs'),
	util = require ('util');
var Article = mongoose.model('Article');

var path = "public/files/";


module.exports = function (app) {
	app.use ('/blog/users', router);
};

/**
 * 登陆
 */
router.post ("/login", function (req, res, next) {
	console.log (req.body);
	var conditions = {
		loginName: req.body.loginname,
		password: req.body.password
	};
	User.findOne (conditions).exec (function (err, user) {
		if (err) return next (err);
		Article.find({published:true}).exec(function (err, articles) {
			if (err) return next(err);
			res.render('blog/index', {
				pageTitle: '博客首页',
				title: '所有博客',
				articles: articles,
				user: user,
				pretty: true
			});
		});
		//res.jsonp(user);
	});
});

/**
 * 注册
 */
router.post ('/register', multipartMiddleware, function (req, res, next) {
	var files = req.files;
	var name = files.person.name;
	var size = files.person.size;
	var type = files.person.type;
	var oDate = new Date ();
	var filename = oDate.getFullYear () + ""
		+ (oDate.getMonth () + 1) + "" + oDate.getDate () + ""
		+ oDate.getHours () + "" + oDate.getMinutes () + ""
		+ oDate.getSeconds () + oDate.getMilliseconds ();
	var originalFilename = files.person.originalFilename;
	var fileExtension = originalFilename.substring (originalFilename.lastIndexOf ('.') + 1);
	var postJson = req.body;
	var readStream = fs.createReadStream (files.person.path);
	var writeStream = fs.createWriteStream (path + filename + "." + fileExtension);
	readStream.pipe (writeStream);
	var file = new File ({
		name: name,
		path: "/" + path + filename + "." + fileExtension,
		size: size,
		type: type
	});
	user = new User ({
		realName: postJson.realName,
		loginName: postJson.loginName,
		password: postJson.password,
		email: postJson.email,
		file: file
	});
	file.save (file, function (err) {
		if (err) return next (err);
		user.save (user, function (err) {
			if (err) return next (err);
			res.end ('finished upload');
		})
	});
})
;

