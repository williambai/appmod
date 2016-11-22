'use strict';
var express = require('express');
var exphbs = require('express-handlebars');

exports = module.exports = function(serve){

	var hbs = exphbs.create({
			defaultLayout: 'public',
			layoutsDir:  __dirname + '/views/layouts/',
			partialsDir: [__dirname + '/views/partials/']
		});
	serve.engine('handlebars', hbs.engine);
	serve.set('views',__dirname + '/views/pages');
	serve.set('view engine', 'handlebars');

	//** service
	require('./service')(serve,'/admin');

	//** asset router
	serve.use('/admin/',express.static(__dirname + '/asset'));

	//** page router
	serve.get('/admin/', function(req,res){
		res.redirect('/admin/home');
	});

	serve.get('/admin/home', function (req, res) {
		res.render('home', {
			title: 'Home',
			user: (req.user) ? {pseudo: req.user.pseudo} : null,
			groups: (req.user) ? req.user.groups : null,
			devices: (req.user) ? req.user.devices : null,
			page: {
				home: true
			},
		});
	});

	serve.get('/admin/register', function(req,res){
		res.render('register', {
			title: 'register',
			user: (req.user) ? {pseudo: req.user.pseudo} : null,
			page:{
				login: true
			},
		});
	});

	serve.get('/admin/login', function(req, res) {
		res.render('login', {
			title: 'Login',
			user: (req.user) ? {pseudo: req.user.pseudo} : null,
			groups: (req.user) ? req.user.groups : null,
			devices: (req.user) ? req.user.devices : null,
			page: {
				login: true
			},
		});
	});
};