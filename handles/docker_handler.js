var Docker = require('dockerode');

var Handler = function(options){
	this.options = options || {};
};

Handler.prototype.add = function(input, done){
	input = input || {};
	console.log('begin: docker add new container');
	console.log('>>>>>: ');
	console.log(input);
	var containerName = input.name;
	var docker = new Docker();
	docker.createContainer({Image: 'ubuntu', Cmd: ['/bin/bash'], name: containerName}, function (err, container) {
		console.log('<<<<<: ');
		if(err) console.log(err);
		else console.log(container);
		console.log('end: docker add new container.');
		done(err,container);
	});
	// var container = docker.getContainer('43afaac163ae');
	// container.start(function (err, data) {
	// 	console.log('<<<<<: ');
	// 	if(err) console.log(err);
	// 	else console.log(data);
	// 	done(err,data);
	// 	console.log('end: docker add handler.')
	// });
	// docker.run('nodered/node-red-docker',['it', 'p 1880:1880', 'name mynodered'],process.stdout ,function(err,data,container){
	// 	console.log('<<<<<: ');
	// 	if(err) console.log(err);
	// 	else console.log(data);
	// 	done(err,data);
	// 	console.log('end: docker add handler.')
	// });
};

Handler.prototype.remove = function(input, done){
	input = input || {};
	console.log('begin: docker remove container');
	console.log('>>>>>: ');
	console.log(input);
	console.log('<<<<<: ');
	var docker = new Docker();
	var container = docker.getContainer(input.id);
	container.remove(function (err, data) {
		console.log('<<<<<: ');
		if(err) console.log(err);
		else console.log(data);
		console.log('end: docker remove container.');
		done(err,data);
	});
};

Handler.prototype.list = function(input, done){
	input = input || {};
	console.log('begin: docker list containers');
	console.log('>>>>>: ');
	console.log(input);
	var docker = new Docker();
	docker.listContainers(function (err, containers) {
		console.log('<<<<<: ');
		if(err) console.log(err);
		else console.log(containers);
		console.log('end: docker list containers.');
		done(err,containers);
	});
};

Handler.prototype.start = function(input, done){
	input = input || {};
	console.log('begin: docker start container');
	console.log('>>>>>: ');
	console.log(input);
	var docker = new Docker();
	var container = docker.getContainer(input.id);
	container.start(function (err, data) {
		console.log('<<<<<: ');
		if(err) console.log(err);
		else console.log(data);
		console.log('end: docker start container.');
		done(err,data);
	});
};

Handler.prototype.stop = function(input, done){
	input = input || {};
	console.log('begin: docker stop container');
	console.log('>>>>>: ');
	console.log(input);
	var docker = new Docker();
	var container = docker.getContainer(input.id);
	container.stop(function (err, data) {
		console.log('<<<<<: ');
		if(err) console.log(err);
		else console.log(data);
		console.log('end: docker stop container.');
		done(err,data);
	});
};

exports = module.exports = Handler;

