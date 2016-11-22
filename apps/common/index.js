'use strict';

exports = module.exports = function(serve){

	//** page router
	serve.get('/login', function(req,res){
		res.send('login page');
	});

	serve.get('/register', function(req,res){
		res.send('register page');
	});

	serve.use(function(req,res){
		res.send('404 not found.');
		// res.redirect('/');
	});
};