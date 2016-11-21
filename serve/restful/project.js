var _ = require('underscore');

var log;
var settings;
var models;


exports = module.exports = {
	
	init: function(options){

	},

	get: function(req,res){
		var projectHandler = new (require('../../handles/project_handler'))();
		projectHandler.list({}, function(err,result){
			if(err) return res.send(err);
			res.send(result || {});
		});
	},

	post: function(req,res){
		var query = req.query || {};
		var body = req.body || {};
		body = _.extend(body,query);
		var action = body.action || 'add';
		var projectHandler = new (require('../../handles/project_handler'))();
		if(action == 'add'){
			projectHandler.add(body, function(err,result){
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
		var projectHandler = new (require('../../handles/project_handler'))();
		res.send({});
	},

	delete: function(req,res){
		var id = req.params.id;
		var projectHandler = new (require('../../handles/project_handler'))();
		projectHandler.remove({id:id},function(err,result){
			if(err) return res.send(err);
			res.send(result || {});
		});
	},
};