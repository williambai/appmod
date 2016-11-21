var path = require('path');
var _ = require('underscore');
var Git = require('nodegit');
var Gitolite = require('nodejs-gitolite');

var Handler = function(options){
	var that = this;
	this.options = options || {};
	var gitolite_path = this.options.gitolite_path || path.resolve(__dirname,'../.gitolite/gitolite-admin');

	Gitolite(gitolite_path, function(err,result){
		if(err) console.log(err);
		that.gitolite = result || {};
	});
};

Handler.prototype.update = function(input, done){
	var that = this;
	input = input || {};
	that.gitolite.update(function(err){
		if(err) console.log(err);
		done(err,that.gitolite.config);
	});
};

Handler.prototype.add = function(input, done){
	var that = this;
	input = input || {};
	var name = input.name || 'unnamed';
	this.update({},function(err){
		that.gitolite.addRepo(name);
		that.gitolite.commit('init ' + name + ' project.', function(err){
			done(err,that.gitolite.config);
		});
	});
};

Handler.prototype.remove = function(input, done){
	var that = this;
	input = input || {};
	var name = input.name || 'unnamed';
	this.update({},function(err){
		var repo = that.gitolite.getRepo(name);
		if(err || !repo) return done(err);
		var reposNew = [];
		_.each(that.gitolite.config.repos,function(repo){
			if(name != repo.name) reposNew.push(repo);
		});
		that.gitolite.config.repos = reposNew;
		that.gitolite.commit('remove ' + name + ' project.', function(err){
			done(err,that.gitolite.config);
		});
	});
};

Handler.prototype.list = function(input, done){
	this.update(input,done);
};

Handler.prototype.attachProject = function(input, done){
	input = input || {};
	var repo_host = input.repo_host || 'git@192.168.1.201';
	var project = input.project || 'unnamed';
	var branch = input.branch || 'unnamed';
	var target_dir = input.target_dir || path.resolve(__dirname,'../.repo', project);
	if(fs.existsSync(path.resolve(__dirname,'../.repo',project,'.git'))) return done(null);
	Git.Clone(repo_host + ':' + project)
		.then(function(repo){
			done(null);
		})
		.catch(function(err){
			console.log(err);
			done(err);
		});
};

Handler.prototype.detachProject = function(input, done){
	input = input || {};
	var repo_host = input.repo_host || 'git@192.168.1.201';
	var project = input.project || 'unnamed';
	var branch = input.branch || 'unnamed';
	var target_dir = input.target_dir || path.resolve(__dirname,'../.repo', project);
	if(!fs.existsSync(path.resolve(__dirname,'../.repo',project,'.git'))) return done(null);
	fs.rmdirSync(path.resolve(__dirname,'../.repo', project));
	done(null);
};

Handler.prototype.addDevice = function(input, done){
	input = input || {};
	var repo_host = input.repo_host || 'git@192.168.1.201';
	var project = input.project || 'unnamed';
	var branch = input.branch || 'unnamed';
	var target_dir = input.target_dir || path.resolve(__dirname,'../.repo', project);
	if(!fs.existsSync(path.resolve(__dirname,'../.repo',project,'.git'))){
		return done('project is not attached.');
	}

	Git.Repository
		.open(path.resolve(__dirname,'../.repo',project,'.git'))
		.then(function(repo){
			return repo
					.getHeadCommit()
					.then(function(commit){
						return repo.createBranch(branch,commit,0,repo.defaultSignature(),'add '+ branch +' device');
					})；
		})
		.done(function(){
			done(null);
		});
};

Handler.prototype.removeDevice = function(input, done){
	input = input || {};
	var repo_host = input.repo_host || 'git@192.168.1.201';
	var project = input.project || 'unnamed';
	var branch = input.branch || 'unnamed';
	var target_dir = input.target_dir || path.resolve(__dirname,'../.repo', project);
	if(!fs.existsSync(path.resolve(__dirname,'../.repo',project,'.git'))){
		return done('project is not attached.');
	}

	Git.Repository
		.open(path.resolve(__dirname,'../.repo',project,'.git'))
		.then(function(repo){
			return repo
					.getHeadCommit()
					.then(function(commit){
						return repo.deleteBranch(branch,commit,0,repo.defaultSignature(),'remove '+ branch +' device');
					})；
		})
		.done(function(){
			done(null);
		});
};

Handler.prototype.updateDevice = function(input, done){

};

exports = module.exports = Handler;
