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
var formidable = require ('formidable'),
	http = require ('http'),
	fs = require ('fs'),
	sys = require ('sys');

var path = "public/files/"


module.exports = function (app) {
	app.use ('/blog/users', router);
};

router.post ('/register', multipartMiddleware, function (req, res, next) {
	console.log (req.files);
	var files = req.files;
	var name = files.person.name;
	var size = files.person.size;
	var type = files.person.type;
	var oDate = new Date ();
	var filename = oDate.getFullYear () + ""
		+ (oDate.getMonth () + 1) + "" + oDate.getDate () + ""
		+ oDate.getHours () + "" + oDate.getMinutes () + ""
		+ oDate.getSeconds () + oDate.getMilliseconds();
	var originalFilename = files.person.originalFilename;
	var fileExtension = originalFilename.substring (originalFilename.lastIndexOf ('.') + 1);
	var postJson = req.body;
	fs.rename (files.person.path, path + filename + "." + fileExtension, function (err) {
		var file = new File ({
			name: name,
			path: "/" + path + filename + "." + fileExtension,
			size: size,
			type: type,
		});
		user = new User({
			realName: postJson.realName,
			loginName: postJson.loginName,
			password: postJson.password,
			email: postJson.email,
			file : file
		});
		file.save(file,function (err) {
			if (err) return next(err);
			user.save(user,function (err) {
				if (err) return next(err);
				res.end('finished upload');
			})
		});
	});
})
;

