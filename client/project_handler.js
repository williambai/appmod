var request = require('request');
var _ = require('underscore');

var Handler = function(options){
	this.options = options || {};
	this.options = options || {};
	this.host = this.options.host || 'localhost';
	this.port = this.options.port || 3500;
	this.url = 'http://' + this.host + ':' + this.port;
};

Handler.prototype.add = function(input, done){
	input = input || {};
	request({
		method: 'POST',
		url: this.url + '/projects',
		json: true,
		body: input,

	},function(err,response,body){
		if(err) return done(err);
		done(null,body);
	});
};


Handler.prototype.remove = function(input,done){
	input = input || {};
	request({
		method: 'DELETE',
		url: this.url + '/projects/' + input.name,
	},function(err,response,body){
		if(err) return done(err);
		done(null,body);
	});
};

Handler.prototype.list = function(input,done){
	input = input || {};
	request({
		method: 'GET',
		url: this.url + '/projects',
	},function(err,response,body){
		if(err) return done(err);
		try{
			body = JSON.parse(body);
		}catch(e){
		}
		var projects = body.repos || [];
		var projectsFiltered = [];
		_.each(projects,function(project){
			var projectFiltered = _.pick(project,'name');
			projectsFiltered.push(projectFiltered);
		});
		done(null,projectsFiltered);
	});
};

exports = module.exports = Handler;