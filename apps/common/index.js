'use strict';

exports = module.exports = function(site){

	site.get('/login', function(req,res){
		res.send('login page');
	});

	site.get('/register', function(req,res){
		res.send('register page');
	});

	site.use(function(req,res){
		res.send('404 not found.');
		// res.redirect('/');
	});
};