var Handler = function(options){
	this.options = options || {};
};

var Handler.prototype.add = function(input, done){
	input = input || {};
	var output = {};
	done(null,output);
};

exports = module.exports = Handler;
