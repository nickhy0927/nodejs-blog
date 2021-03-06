var express = require ('express');
var glob = require ('glob');

var favicon = require ('serve-favicon');
var logger = require ('morgan');
var cookieParser = require ('cookie-parser');
var session = require ('express-session');

var bodyParser = require ('body-parser');
var compress = require ('compression');
var methodOverride = require ('method-override');
var moment = require ('moment');
var truncate = require ('truncate');

var mongoose = require ('mongoose');
var Category = mongoose.model ('Category');


module.exports = function (app, config) {
	var env = process.env.NODE_ENV || 'development';
	app.locals.ENV = env;
	app.locals.ENV_DEVELOPMENT = env == 'development';

	app.set ('views', config.root + '/app/views');
	app.set ('view engine', 'jade');

	// app.use(favicon(config.root + '/public/img/favicon.ico'));
	app.use (logger ('dev'));
	app.use (bodyParser.json ());
	app.use (bodyParser.urlencoded ({
		extended: true
	}));

	// 使用session
	app.use (session ({
		resave: true, // don't save session if unmodified
		saveUninitialized: false, // don't create session until something stored
		secret: 'user'
	}));

	app.use (function (req, res, next) {
		if (req.url.indexOf ("components") < 0 || req.url.indexOf('/js') < 0
			|| req.url.indexOf('/css') < 0 || req.url.indexOf('/img') < 0
			|| req.url.indexOf('/images') < 0) {
			console.log('地址为：' + req.url);
			if (req.url.indexOf ("admin") > 0) {
				if (!req.session.adminUser) {
					// if (req.url == '/admin/login')
					// 	next();
					// else
					// app.locals.message = '请先登录！';
					// 	res.redirect ('/admin/login');
					next();
				} else {
					next ();
				}
			} else if (req.url.indexOf ("blog") > 0) {
				if (req.url.indexOf ("user") > 0) {
					if (req.url.indexOf('login') < 0) {
						if (!req.session.user) {
							if (req.url == "/blog/login") {
								next ();//如果请求的地址是登录则通过，进行下一个请求
							} else {
								app.locals.message = '请先登录！';
								res.redirect ('/blog/login')
							}
						} else if (req.session.user) {
							app.locals.user = req.session.user;
							next ();
						}
					} else
						next();

				} else
					next();
			} else {
				if (req.url == "/") {
					res.redirect ("/blog");
				}
				next ();
			}
		} else
			next();
	});
	app.use (function (req, res, next) {
		app.locals.pageName = req.path;
		app.locals.moment = moment;
		app.locals.truncate = truncate;
		app.locals.contextPath = config.root + '/public/';
		Category.find ().exec (function (err, categories) {
			if (err) {
				return next (err)
			}
			app.locals.categories = categories;
		});
		next ();
	});

	app.use (cookieParser ());
	app.use (compress ());
	app.use (express.static (config.root + '/public'));
	app.use (methodOverride ());

	var controllers = glob.sync (config.root + '/app/controllers/**/*.js');
	controllers.forEach (function (controller) {
		require (controller) (app);
	});

	app.use (function (req, res, next) {
		var err = new Error ('Not Found');
		err.status = 404;
		next (err);
	});

	if (app.get ('env') === 'development') {
		app.use (function (err, req, res, next) {
			res.status (err.status || 500);
			res.render ('error', {
				message: err.message,
				error: err,
				title: 'error'
			});
		});
	}

	app.use (function (err, req, res, next) {
		res.status (err.status || 500);
		res.render ('error', {
			message: err.message,
			error: {},
			title: 'error'
		});
	});
};
