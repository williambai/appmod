exports = module.exports = function(serve, prefix){
	prefix = prefix || '';
	
	serve.post(prefix + '/register', function(req,res){
		res.send('to do.');
	});

	serve.post(prefix + '/login', function(req,res){
		res.send('to do.');
	});

};