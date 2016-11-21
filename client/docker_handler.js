var request = require('request');
var _ = require('underscore');

var Handler = function(options){
	this.options = options || {};
	this.host = this.options.host || 'localhost';
	this.port = this.options.port || 3500;
	this.url = 'http://' + this.host + ':' + this.port;
};

Handler.prototype.add = function(input,done){
	input = input || {};
	request({
		method: 'POST',
		url: this.url + '/dockers?action=add',
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
		url: this.url + '/dockers/' + input.name,
	},function(err,response,body){
		if(err) return done(err);
		done(null,body);
	});
};

Handler.prototype.list = function(input,done){
	input = input || {};
	request({
		method: 'GET',
		url: this.url + '/dockers',
	},function(err,response,body){
		if(err) return done(err);
		var containers = [];
		try{
			containers = JSON.parse(body);
		}catch(e){
			containers = [];
		}
		var containersFiltered = [];
		_.each(containers,function(container){
			var containerFiltered = _.pick(container, 'Id','Name','Image','Command');
			containerFiltered.sid = [].slice.call(containerFiltered.Id, 0, 12).join('');
			containersFiltered.push(containerFiltered);
		});
		done(null,containersFiltered);
	});
};

Handler.prototype.start = function(input, done){
	input = input || {};
	request({
		method: 'PUT',
		url: this.url + '/dockers/'+ input.id +'?action=start',
	},function(err,response,body){
		if(err) return done(err);
		done(null,body);
	});
};

Handler.prototype.stop = function(input, done){
	input = input || {};
	request({
		method: 'PUT',
		url: this.url + '/dockers/'+ input.id + '?action=stop',
	},function(err,response,body){
		if(err) return done(err);
		done(null,body);
	});
};

exports = module.exports = Handler;
