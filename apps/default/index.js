exports = module.exports = function(serve){

	//** service
	require('./service')(serve,'');

	//** page router
	serve.get('/', function(req,res){
		res.send('hello world.');
	});

};