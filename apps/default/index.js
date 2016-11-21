exports = module.exports = function(site){

	site.get('/', function(req,res){
		res.send('hello world.');
	});

};