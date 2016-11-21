var _ = require('underscore');

var log;
var settings;
var models;


exports = module.exports = {
	
	init: function(options){

	},

	get: function(req,res){
		var dockerHandler = new (require('../../handles/docker_handler'))();
		dockerHandler.list({}, function(err,result){
			if(err) return res.send(err);
			res.send(result || {});
		});
	},

	post: function(req,res){
		console.log(req)
		var query = req.query || {};
		var body = req.body || {};
		body = _.extend(body,query);
		var action = body.action || 'none';
		var dockerHandler = new (require('../../handles/docker_handler'))();
		if(action == 'add'){
			dockerHandler.add(body, function(err,result){
				if(err) return res.send(err);
				res.send(result || {});
			});
		}else{
			res.send({});
		}
	},

	put: function(req,res){
		var id = req.params.id;
		var action = req.query.action || 'none';
		var dockerHandler = new (require('../../handles/docker_handler'))();
		if(action == 'start'){
			dockerHandler.start({id:id},function(err,result){
				if(err) return res.send(err);
				res.send(result || {});
			});
		}else if(action == 'stop'){
			dockerHandler.stop({id:id},function(err,result){
				if(err) return res.send(err);
				res.send(result || {});
			});
		}else{
			res.send({});
		}
	},

	delete: function(req,res){
		var id = req.params.id;
		var dockerHandler = new (require('../../handles/docker_handler'))();
		dockerHandler.remove({id:id},function(err,result){
			if(err) return res.send(err);
			res.send(result || {});
		});
	},
};