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
		var projects = [];
		try{
			projects = JSON.parse(body);
		}catch(e){
			projects = [];
		}
		var projectsFiltered = [];
		_.each(projects,function(project){
			var projectFiltered = _.omit(project);
			projectFiltered.sid = [].slice.call(projectFiltered.Id, 0, 12).join('');
			projectsFiltered.push(projectFiltered);
		});
		done(null,projectsFiltered);
	});
};

exports = module.exports = Handler;